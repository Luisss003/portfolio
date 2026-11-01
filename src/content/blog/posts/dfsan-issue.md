---
title: "Master Thesis Update: DFsan..."
date: "2026-10-25"
summary: "Issues I've had with DFsan."
tags: ["Systems Security", "Instrumentation", "Master Thesis"]
newsTitle: "First big issue in thesis."
showInNews: true
draft: false
---

# Issues with DFsan
A small update. I've been starting to implement my thesis. If you can recall, it works via LLVM -> Instrument Binary, a C runtime to track data (I call it the analysis runtime), and the classification algorithm.

The LLVM part has been pretty easy, as I'm just instrumenting and tracking for malloc/free, but I've come across my first big issue. My idea was simply to use LLVM's dfsan capatbilities to track attacker derived data. While I'm not at that step yet, I wanted to get an idea of what technologies I'd be working with at that step. 

dfsan worked great; it kept metadata, and labeled what I told it to label, and those labels were propogated in copies, loads, stores, whatever. But, the big thing. IT completely replaces the allocator! It completely takes over allocations, and I first saw this when my usual looking glibc heap addresses were replaced with strange looking `0x10095` looking addresses. I suspected dfsan immediately, and did find out this is how it was meant to work.

Given my entire approach takes into account GLIBC, I didn't want to go through the process of rewriting or modifying dfsan to skip that step, and go through a myriad of headaches.

Thankfully, I learned about libdtf64. This is less an instrumentation based approach to data flow tracing, and more relies on dynamic analysis. It does this via Intels' PIN technology, which honestly I don't fully understand, but it seems like a good choice to take on the taint analysis part of my implementation.
