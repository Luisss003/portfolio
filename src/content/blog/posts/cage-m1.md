--- 
title: "Creating a Security Oriented Docker Pt.1" 
date: "2026-07-06" 
summary: "The first part in series documenting the creation of cage, my custom Linux sandbox." 
tags: ["System Security", "Containerization", "Malware Analysis", "Binary Analysis"] 
newsTitle: "Published a new writeup on cage." 
showInNews: true 
draft: false
--- 
# cage: Creating a Security Oriented Docker Pt.1 
## Background and Reasoning
Docker is not inherently dangerous, or insecure; it was simply not meant for security. It heavily relies on the concept of Linux namespaces, which to briefly explain, is a just a way to isolate a common resource between groups/namespaces. For anyone who has done any kind of binary/malware analysis, this is a clear red flag; you wouldn't want an unknown binary to have access to host resources. Even the smallest misconfiguration, or error on Dockers part, allows the process to escape containerization. 

And again, Docker was designed for portability and isolation for the purpose of efficiency, not security. Given these "constraints" of Docker, I set out to create a lightweight, but secure containerization program on Linux, that could allow users to analyze and safely run unknown, and possibly even malicious binaries. Most of the time, analysis should really be done on junk/throwaway machines that are typically older. On top of that, virtual machines are also a requirement, because you would want to isolate and mimick a network via REmnux. Two VMs + an older machine just screams of a poor analysis experience, especially for those of us who cannot afford newer "throwaway" machines, so cage also aims to solve this issue. At the time of writing this, I've made significant progress with cage, allowing for the true isolation at the syscall level!. Along with that, syscall + network tracing is currently a WIP, and network I am currently planning how I will emulate REmnux's network isolation + outbound connection handling. 

## Methodology 
### Creating the Namespaces
Before I began to program, I wanted to deeply understand why containers are not inherently secure. The answer is quite simple; Linux namespaces really just allow you to hide the existence of other PIDs, mount points, network interfaces, and more from any process inside a specific namespace. Just because they are hidden doesn't mean they dont exist; this means processes can still interact with the resources in other namespaces. Knowing this, I knew pretty early on that a key feature of my program would have to be configurable syscall filtering.

To set up basic namespaces for network, mount, PID, UTS, and user isolation, I started with `clone()`. This is the point where cage begins to stop being a normal process launcher and starts becoming a container runtime. The parent process creates a child with several namespace flags enabled: `CLONE_NEWNET`, `CLONE_NEWPID`, `CLONE_NEWNS`, `CLONE_NEWUTS`, and `CLONE_NEWUSER`.

Each of these namespaces handles a different part of the isolation problem. The PID namespace gives the child its own process tree, so from inside the cage the process can see itself as PID 1. This also prevents it from viewing the true PIDs of host processes. The mount namespace lets cage create a separate filesystem view without changing the host's mounts. The UTS namespace lets the container have its own hostname. The user namespace is especially important, because it allows the process to appear as root inside the container while still mapping back to an unprivileged user on the host.

That last part is very important. A process being UID 0 inside the container should not mean it is true root on the host. To handle this, the parent writes to the child's `/proc/[pid]/uid_map` and `/proc/[pid]/gid_map`. Before writing the GID map, cage also writes `deny` to `/proc/[pid]/setgroups`, which is required before mapping groups in an unprivileged user namespace. This allows the child to call `setuid(0)` and `setgid(0)` inside the namespace, but this root identity is constrained by the mapping created by the parent.

To avoid a race condition, I added a pipe between the parent and child. The child starts, closes the write side of the pipe, and waits. The parent writes the UID/GID mappings, then sends a single byte through the pipe. Only after receiving that byte does the child continue setting itself up. Without this synchronization, the child could try to become root inside the user namespace before the parent has finished writing the mapping files.

After the namespace setup, the next problem was the filesystem. For a secure container, it's not enough to just hide parts of the host filesystem. I wanted cage to give the child a new root filesystem view. To accomplish this, I created a temp directory under `/tmp` using `mkdtemp()`. This directory will become the new root for the container after pivoting.

Before pivoting into it, cage bind mounts a few required host directories into the new root: `/bin`, `/usr`, `/lib`, and `/lib64`. These are needed because most normal dynamically linked Linux programs depend on binaries, shared libraries, the dynamic linker, and supporting files from those locations. However, these directories are not mounted normally. After the bind mount, cage remounts them as read-only. This gives the process enough of a Linux userspace to execute basic programs, but prevents the sandboxed proc from modifying the host's local binaries.

This is a good example of the design tradeoff in cage. A minimal filesystem would be safer, but much harder to use. A full copy of a Linux root filesystem would work, but it would make cage heavier and less interesting as a small sandbox. The current version sits somewhere in the middle: expose enough of the host userspace to run simple dynamically linked programs, but expose it as read-only and from inside a separate mount namespace.

Once the temporary root is prepared, cage copies the target binary into the new root. Right now, the executable is still hardcoded for testing, but the idea is that this will eventually come from command line arguments. The copy step matters because after `pivot_root`, the process should not depend on being able to access the original host path of the binary. The executable gets placed directly into the container root, and then the child pivots into that root.

The pivot itself is done with the `pivot_root` syscall. This is one of the most important parts of the project so far. `pivot_root` changes what the process sees as `/`. Unlike a basic `chroot`, this is being done inside a new mount namespace, followed by the unmounting of the old root. After the pivot, cage changes directory to `/`, mounts a fresh `/proc`, detaches the old root with `umount2(..., MNT_DETACH)`, and removes the oldroot directory. Now, we are completely isolated from the host's filesystem.

Mounting a new `/proc` is necessary because the PID namespace changes what processes should be visible. If `/proc` was left as-is from the host, then the container could still observe host process information. By mounting a new proc filesystem after entering the PID namespace, the process sees the container's process view instead. This is also why PID namespaces are not useful by themselves. They need to be combined with mount namespace setup, otherwise `/proc` can leak information that the namespace was supposed to hide.

I also set the hostname to `cage`. This is a small feature, but it is useful for proving that the UTS namespace is active. If I run `hostname` from inside the sandbox, it should show `cage`, while the host keeps its normal hostname.

At this stage, cage has the start of real container behavior: new namespaces, mapped user IDs, a separate root, read-only system bind mounts, a fresh `/proc`, and a copied target executable. This is already useful, but it is not enough for running suspicious binaries. A malicious program does not need to see the host filesystem to still do damage. It can make syscalls, open sockets, fork processes, consume resources, attempt kernel attack surface, or abuse anything accidentally exposed to it. This is where syscall filtering comes in.

### Syscall Filtering
The first version of cage's syscall filtering uses seccomp. Seccomp is a Linux feature that allows a process to restrict which syscalls it is allowed to make. This is exactly the kind of control cage needs, because namespaces hide resources, but seccomp limits behavior.

The goal is to let the user provide a syscall configuration file. Cage reads this file line by line, resolves syscall names into syscall numbers using libseccomp, and builds an allow list. For example, a minimal test configuration might allow syscalls like `read`, `write`, `exit`, `brk`, `mmap`, and the other syscalls needed for a very small binary to start. If no configuration file is provided, the intended behavior is to deny everything by default.

This is where the project starts becoming more security-oriented than Docker-style containerization. Docker usually tries to run real applications, so it has to allow a fairly large amount of normal Linux behavior. Cage is meant for suspicious binaries, so the default attitude should be the opposite: allow as little as possible, and only add syscalls when the analysis target needs them.

There is still some work to do here. The seccomp setup exists, but I am keeping it separated while testing the namespace and filesystem behavior. This is because enabling a strict syscall filter too early makes debugging painful. A missing syscall can kill the process before I even know whether the mount namespace or pivot logic worked. The plan is to finish the container setup first, then re-enable seccomp once the execution path is stable.

The most important implementation detail is that seccomp should be default-deny. In other words, cage should start with a filter action that kills the process, returns an error, or otherwise blocks any syscall not explicitly allowed. Then the allow list should add back only the syscalls that are needed. This is the model that makes sense for malware analysis, because unknown behavior should fail closed, not fail open. In the future, I'd like to allow syscalls for certain files/resources, but deny for other resources.

### Syscall Tracing
In addition to filtering syscalls, I also started working on syscall tracing with `ptrace`. Filtering and tracing solve different problems. Seccomp is preventative: it stops a syscall from happening. Ptrace is observational: it lets the parent inspect what the child is trying to do.

The tracing code uses `PTRACE_SYSCALL`, which causes the child to stop on syscall entry and syscall exit. I also set `PTRACE_O_TRACESYSGOOD`, which makes syscall stops easier to distinguish from normal signal stops. Without that option, it is easy to confuse a regular `SIGTRAP` with a syscall-related stop. With it enabled, syscall stops can be identified by checking for `SIGTRAP | 0x80`.

For now, the tracer prints the syscall number and recognizes a few basic syscalls like `read`, `write`, and `open`. I also added early file I/O detection logic. When the process calls `read`, cage prints the file descriptor, destination buffer, and byte count. When it calls `write`, cage prints the file descriptor, source buffer, and byte count. This is still primitive, but it is the beginning of an audit layer.

The next step for this part is to resolve file descriptors into actual file paths. Right now, seeing `write(fd=3)` is useful, but not useful enough. What I really want is something like:

`write(fd=3 -> /tmp/sample-output, size=128)`

This would make the trace much more valuable for malware analysis, because file behavior is one of the first things you want to understand. Did the binary modify a file? Did it drop a payload? Did it write to a suspicious location? Did it read a config file or credential file? These are the kinds of questions cage should eventually answer automatically.

### Current State
Right now, cage is not a finished sandbox, and I don't want to present it as one. The current version is closer to a working foundation. It can create the major namespaces, map the user namespace correctly, build a temporary root filesystem, bind in important system directories as read-only, pivot into the new root, mount a fresh `/proc`, and execute a program from inside the cage.

The project also has the beginning of two major security features: seccomp filtering and ptrace-based syscall tracing. These are not just extra features; they are the parts that move cage from "small container project" toward "security analysis tool." Namespaces reduce what the process can see. Seccomp limits what it can do. Ptrace helps explain what it tried to do.

There are still major limitations. The target executable is currently hardcoded. The root filesystem is still very simple. The syscall allow list needs more work. Network isolation exists at the namespace level, but I have not yet built the REMnux-like network emulation I want. Resource limits are also not implemented yet, meaning a malicious process could still try to abuse CPU, memory, or process creation unless those controls are added.

Even with those limitations, this first stage was important. Before adding higher-level features, I needed to prove that I could create a process with its own view of users, PIDs, mounts, hostname, network stack, and root filesystem. Cage now has that base. The next part of this series will focus on making syscall filtering stricter, improving audit logs, and deciding how cage should handle networking for suspicious binaries.
