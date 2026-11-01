---
title: "Thoughts on Existing Research"
date: "2026-09-24"
summary: "Giving my thoughts on papers I read during my thesis literature review."
tags: ["Systems Security", "Dynamic Memory Safety and Corruption", "Research"]
newsTitle: "My thoughts on existing research"
showInNews: true
draft: true
---

# My Thoughts on Existing Research
I read around 25 papers over the span of June 2026 - September 2026. In that time, I did find some reoccuring or interesting ideas or invariants.

## Memory Protection Mechanisms
First off, this seems entirely almost hopeless; key word being "almost".

The paper `SOK: Eternal War in Memory` lays out the modern (at the time) mitigation and prevention techniques for both spatial and temporal bugs. 

They give us three criteria: how much a technique costs in terms of memory and runtime overhead, how well it interacts with third party libraries, and how well it does what it says it can do.

The first thing that came to my mind was, cost? While I'm mostly against AI/ML in systems, I know enough about them to understand how that could be advantageous for this specifically. It seems most techniques talked about here have a blind assumption that every load/store, or whatever is worth protecting, but with AI/ML, could we develop a system that can identify these "areas of interest"? For example, perhaps a bug does nothing to the overall security of a system, but maybe another bug leads the attacker to be able to call `system()`. We could quantify this by tracing the flow of data and provnenance of pointers, use AI/ML to determine this for a program, and reduce cost greatly. Also, in general since most large scale systems are distributed anyway, and use the paradigm of master + workers, does it really hurt the overall work done if the master, the most important node, is a bit slower than it's workers, but more secure? Workers can be shut down and recreated easily; the master is most important. 

Another one, that we simply cant get around is compatability. Because this is probaly the most important metric, it seem's as if native C will never truly be memory safe, temporal or spatially. I feel this is because unless we are willing to rewrite entire libraries with the technique in mind, a compataible technique will always be expensive. Of course, there are exceptions like stack canaries, but we are past that phase. Metadata + bounds are what most modern mitigations use, but those are fairly expensive to maintain + query on each memory operation. Either hardware, or learning based software protections seems like the future.

## Invariants
I read a series of papers that spanned automatic exploit generation, retro-fitting C memory safety, analysis techniques, formalizations, and more. It seems to me that despite the varying goals of these papers, they all look at the allocator as either and/or:
1. States with transitions
2. Relationships that change overtime

I found this really useful for my own thesis. Like, if we really think about what the allocator does, at the operational level, its just going through states. This is most evidence when we look at bins/tcache and consolidation. We can force chunks to consolidate, move to our bins of choice, etc. And relationships, its simply about "who owns what". Who owns this heap range, who owns this allocation, who owns these chunks, etc. That mindset, along with simply knowing how glibc's allocator works, has been really helpful in writing my thesis' analysis approach, and with my own personal exploitation projects.