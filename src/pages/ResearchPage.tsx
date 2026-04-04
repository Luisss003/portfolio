import bg from "../assets/other_bg.jpg";
import { Navbar } from "../components/Navbar";

const researchDomains = [
  {
    domain: "Binary Analysis & Malware Reverse Engineering",
    projects: [
      {
        title: "WannaCry & EternalBlue: Kernel-Mode Exploit Chain Analysis",
        description: "Reverse engineered the EternalBlue SMB exploit (CVE-2017-0144). Analyzed kernel-mode buffer overflows, process hollowing techniques, and AES+RSA encryption procedures used for mutex-based persistence.",
        tech: "Ghidra, WinDbg, x86 Assembly, FlareVM, Win32 API",
        link: "https://github.com/Luisss003/WannaCry-Analysis"
      },
      {
        title: "LuRETools: Binary Header Instrumentation & Memory Access",
        description: "Developed a C-based utility suite for parsing Windows PE and Linux ELF headers. Implemented direct memory access routines to identify binary compatibility anomalies and embedded metadata without source code access.",
        tech: "C, Systems Programming, ELF/PE Specifications, Raw Memory Access",
        link: "https://github.com/Luisss003/LuRETools"
      }
    ]
  },
  {
    domain: "Network Security & Link-Layer Exploitation",
    projects: [
      {
        title: "LL-Inj: Link-Layer Packet Replay & Injection Framework",
        description: "Built a low-latency packet injection tool using raw sockets. Focused on real-time header modification (MAC/IP/TCP SEQ) and checksum recalculation for synchronous replay attacks.",
        tech: "C, libpcap, libdnet, Raw Sockets, Network Protocols",
        link: "https://github.com/Luisss003/Link-Layer-Replay-Attack"
      },
      {
        title: "Pcap-Parser: Non-blocking Network Traffic Analysis",
        description: "Implemented a high-performance PCAP processor in C to analyze link-layer protocols and reconstruct network flows for forensic analysis.",
        tech: "C, libpcap, Network Protocols, Forensic Reconstruction",
        link: "https://github.com/Luisss003/Pcap-Parser"
      }
    ]
  },
  {
    domain: "Vulnerability Research (VR) & Automation",
    projects: [
      {
        title: "BufOvf: Automated Payload Generation for x86/x64",
        description: "Developed a toolset for automating the generation of buffer overflow payloads. Researched mitigation bypassing techniques including ROP-chain synthesis and stack canary exhaustion.",
        tech: "C, Python, Assembly (x86/x64), ROP-Chain Synthesis, Exploit Automation",
        link: "https://github.com/Luisss003/BufOvf64-PayloadGen"
      },
      {
        title: "Othello-DNN: Parameter-Limited Neural Networks in Games",
        description: "Explored adversarial search optimization by implementing a custom Deep Neural Network agent. Optimized for performance within strict parameter constraints.",
        tech: "Python, Deep Learning, Game Theory, Parameter Optimization",
        link: "https://github.com/Luisss003/Othello-Deep-Learning"
      }
    ]
  }
];

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-amber-50" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-amber-100 font-avant">Technical Research & Lab Work</h1>
          <p className="mt-4 text-amber-200/70 max-w-2xl">
            Selected investigations into systems security, binary instrumentation, and link-layer exploitation. 
            Focusing on the intersection of low-level architecture and automated vulnerability discovery.
          </p>
        </header>

        <div className="space-y-16">
          {researchDomains.map((domain) => (
            <section key={domain.domain}>
              <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-amber-200/40 border-b border-amber-200/10 pb-2 mb-6">
                {domain.domain}
              </h2>
              
              <div className="grid gap-10">
                {domain.projects.map((project) => (
                  <article key={project.title} className="group p-6 rounded-xl border border-transparent transition hover:border-amber-200/5 hover:bg-white/[0.02]">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                      <h3 className="text-xl font-semibold text-amber-100 group-hover:text-white transition">
                        {project.title}
                      </h3>
                      <a href={project.link} className="text-[10px] uppercase tracking-widest text-amber-200/50 hover:text-amber-100 transition whitespace-nowrap">
                        Source Code ↗
                      </a>
                    </div>
                    
                    <p className="mt-3 text-sm leading-relaxed text-amber-50/70 max-w-3xl italic">
                      {project.description}
                    </p>
                    
                    {/* Updated highly-visible technical keywords */}
                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                      {project.tech.split(", ").map((keyword) => (
                        <span 
                          key={keyword}
                          className="text-xs font-medium text-amber-100/90 bg-amber-200/10 border border-amber-200/20 px-3 py-1 rounded-full whitespace-nowrap"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* The YouTube Outreach Section */}
        <section className="mt-20 p-8 rounded-2xl border border-amber-200/10 bg-[#140607]">
          <h2 className="text-2xl font-bold text-amber-100 font-avant mb-4">Technical Outreach</h2>
          <p className="text-sm text-amber-50/80 mb-6">
            I operate <span className="text-amber-200 font-bold">Luis' Low Level</span>, a YouTube channel dedicated to making reverse engineering and systems security accessible.
          </p>
          <a href="https://www.youtube.com/@LuisSaenz-RevEng" className="inline-block rounded-full border border-amber-200/40 px-6 py-2 text-xs uppercase tracking-widest hover:bg-amber-200 hover:text-black transition">
            View Channel (1.5k+ Viewers)
          </a>
        </section>
      </main>
    </div>
  );
}