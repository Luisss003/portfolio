# React + TypeScript + Vite

## Updating Recent News And Blog Posts

There are two ways to update Recent News.

For non-blog announcements, add an object to `public/news.json`. The home page
sorts entries by date and shows only the newest three.

```json
{
  "date": "2026-07-15",
  "title": "Published a new writeup on binary analysis.",
  "href": "https://example.com/writeup"
}
```

`href` is optional. Use it when the news item should link to a blog post,
writeup, video, or repository.

For blog posts and writeups, add a Markdown file under
`src/content/blog/posts`. You can copy `src/content/blog/posts/template.md`
and rename it. Published Markdown posts are added to `/blog`, sorted
newest-first, and also appear in Recent News automatically unless
`showInNews: false` is set.

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

The file name becomes the URL. For example,
`src/content/blog/posts/heap-notes.md` becomes `/blog/heap-notes`.

Remove `draft: true` before publishing, or set it to `draft: false`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
