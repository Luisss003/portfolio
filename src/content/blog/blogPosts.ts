type Frontmatter = Record<string, string | string[] | boolean>;

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
  readTime: string;
  newsTitle?: string;
  showInNews: boolean;
};

const markdownModules = import.meta.glob("./posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function parseValue(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue === "true") {
    return true;
  }

  if (trimmedValue === "false") {
    return false;
  }

  if (trimmedValue.startsWith("[") && trimmedValue.endsWith("]")) {
    const items = trimmedValue.slice(1, -1).trim();

    if (!items) {
      return [];
    }

    return items.split(",").map((item) => stripQuotes(item.trim()));
  }

  return stripQuotes(trimmedValue);
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);

  if (!match) {
    return {
      data: {},
      content: markdown.trim(),
    };
  }

  const data = match[1].split(/\r?\n/).reduce<Frontmatter>((fields, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return fields;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!key) {
      return fields;
    }

    return {
      ...fields,
      [key]: parseValue(value),
    };
  }, {});

  return {
    data,
    content: markdown.slice(match[0].length).trim(),
  };
}

function stringField(data: Frontmatter, key: string, fallback = "") {
  const value = data[key];
  return typeof value === "string" ? value : fallback;
}

function optionalStringField(data: Frontmatter, key: string) {
  const value = data[key];
  return typeof value === "string" ? value : undefined;
}

function stringArrayField(data: Frontmatter, key: string) {
  const value = data[key];
  return Array.isArray(value) ? value : [];
}

function booleanField(data: Frontmatter, key: string, fallback: boolean) {
  const value = data[key];
  return typeof value === "boolean" ? value : fallback;
}

function slugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? path;
}

function readingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(date));
}

export const blogPosts = Object.entries(markdownModules)
  .map(([path, markdown]) => {
    const { data, content } = parseFrontmatter(markdown);
    const slug = slugFromPath(path);
    const title = stringField(data, "title", slug);
    const date = stringField(data, "date");
    const draft = booleanField(data, "draft", false);

    if (!date) {
      throw new Error(`Blog post "${slug}" is missing a date field.`);
    }

    return {
      slug,
      title,
      date,
      summary: stringField(data, "summary"),
      tags: stringArrayField(data, "tags"),
      content,
      readTime: readingTime(content),
      newsTitle: optionalStringField(data, "newsTitle"),
      showInNews: booleanField(data, "showInNews", true),
      draft,
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export function getBlogPost(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}
