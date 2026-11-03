---
title: "Master Thesis LLVM IR Experiment on Shallow Copies"
date: "2026-10-14"
summary: "Showing off some results on one of my experiments on how LLVM IR handles shallow copies."
tags: ["Systems Security", "Instrumentation", "LLVM", "Master Thesis"]
newsTitle: "Experiment results on LLVM IR"
showInNews: true
draft: true
---

# Master Thesis LLVM IR Experiment on Shallow Copies
## Background
Using LLVM to call my runtime on `malloc()` and `free()` has been pretty easy, but now I need to get into instrumenting normal code. Since I'll be handling pointer provenance myself, I first wanted to get started on the easiest of pointer operations, that being a simply shallow copy. A shallow copy really justs copies the address of one pointer into another, but believe it or not, I could think of 9 variations on this. Those include:
 1. Decleration assignment: int *a = b;
 2. Ressignment: a = b;
 3. Pointer Cast: int *a = (int *)b;
 4. Void Conversion: void *a = (void *)b;
 5. Pointer Array: int *a[10]; a[0] = b;
 6. Struct Field Assignment: struct A { int *a; }; struct A s; s.a = b;
 7. Function Argument: void foo(int *a); foo(b);
 8. Function Return: int *foo(); int *a = foo();
 9. Conditional Assignment: int *a = (cond) ? b : c;

Therefore, I wanted to get a general idea as to how LLVM with no optimizations `-O0` creates its IR so I'd know what to target. And you'll find, it's alot less exciting than it sounds.