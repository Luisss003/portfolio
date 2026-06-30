# Blog Posts

Add published blog posts as Markdown files in `src/content/blog/posts`.

Each post needs frontmatter at the top:

```md
---
title: "My writeup title"
date: "2026-07-15"
summary: "One short sentence for the blog index."
tags: ["Reverse Engineering", "Binary Analysis"]
newsTitle: "Published a new reverse engineering writeup."
showInNews: true
---

Write the post body here in Markdown.
```

The file name becomes the URL slug. For example:

`src/content/blog/posts/heap-notes.md` becomes `/blog/heap-notes`.

Posts are sorted by `date` newest-first. Published posts also appear in Recent
News unless `showInNews` is set to `false`.

Use `draft: true` to keep a post out of the live site while you are writing it.
