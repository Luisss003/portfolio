---
title: "Master Thesis Update: LLVM IR Pointer Arithmetic Experiment"
date: "2026-11-2"
summary: "Quick experiment methodology and results in regard to how LLVM IR represents pointer arithmetic."
tags: ["Systems Security", "LLVM", "Program Analysis"]
newsTitle: "Writeup on LLVM IR's representation of pointer arithmetic."
showInNews: true
draft: false
---

# LLVM IR's Representation of Pointer Arithmetic
As I continue on in my manual pointer provenance handling for my master's thesis, I needed to do another quick experiment. Simply, what patterns appear in LLVM's IR, with no optimization, when performing arithmetic? Does order of operation matter i.e. `ptr + x` vs `x + ptr`? Well, lets get into that!

## Methodology
Essentially, I first determined what was and wasn't allowed in C. C supports the following pointer arithmetic operations:
1. Addition `ptr + x`/`x + ptr` (indexes x elements ahead)
2. Subtraction Constant `ptr - x` (only allowed to refer elements behind ptr; `x - ptr` is
   a mathematical expression.
3. Pointer Subtraction `ptr - ptr2` (returns the distance between two pointers)
4. Pointer Increment and Decrement `ptr++`, `++ptr`, `ptr--`, `--ptr` (index one
   element ahead or behind of ptr)

C doesn't support bitwise, mult, div, or shift operations on pointers, unless
you first cast them as integers, then re-cast into pointers.

So, I simply wrote a few test .c files, and compiled them with the following
command: `clang-19 -O0 -fno-builtin -Xclang -disable-O0-optnone -S -emit-llvm ptr-arithmetic-ir.c -o ptr-arithmetic-ir.ll`

## Results
### Addition
```C
void *ptr = malloc(8);
ptr + 1;
```
Both orientations resulted in the same LLVM IR. The important pattern generated:
```
%5 = getelementptr inbounds i8, ptr %4, i64 1
```

### Const Subtraction
```C
void *ptr = malloc(8);
ptr - 1;
```

LLVM IR:
```
%5 = getelementptr inbounds i8, ptr %4, i64 -1
```

### Pointer Subtraction
```C
void *ptr = malloc(8);
void *ptr2 = malloc(8);
ptr2 - ptr;
```

LLVM IR:
```
%8 = ptrtoint ptr %6 to i64
%9 = ptrtoint ptr %7 to i64
%10 = sub i64 %8, %9
```

### Pointer Increment
```C
void *ptr = malloc(8);
ptr++;
```
Both orientations resulted in the same LLVM IR.

LLVM IR:
```
%5 = getelementptr inbounds i8, ptr %4, i32 1
store ptr %5, ptr %2, align 8
```

### Pointer Decrement
```C
void *ptr = malloc(8);
ptr--;
```
Both orientations resulted in the same LLVM IR.

LLVM IR:
```
%5 = getelementptr inbounds i8, ptr %4, i32 -1
store ptr %5, ptr %2, align 8
```

### Thoughts
Interestingly, rather than interpreting pointer arithmetic as mathematical arithmetic, it simply employs an indexing technique. Additionaly, I suspect the results would be different, but follow the same general patterns if I were to use different types, such as `int` or `char` pointers, as well as different widths of the same type. Thank you for reading.
