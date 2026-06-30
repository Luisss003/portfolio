import { type ReactNode, useMemo } from "react";

type MarkdownBlock =
  | { type: "code"; code: string; language: string }
  | { type: "heading"; level: number; text: string }
  | { type: "hr" }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string };

function isBlockStart(line: string) {
  return (
    /^```/.test(line) ||
    /^#{1,4}\s+/.test(line) ||
    /^[-*_]{3,}$/.test(line.trim()) ||
    /^>\s?/.test(line) ||
    /^[-*]\s+/.test(line) ||
    /^\d+\.\s+/.test(line)
  );
}

function parseMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      index += 1;
      continue;
    }

    if (trimmedLine.startsWith("```")) {
      const language = trimmedLine.replace(/^```/, "").trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({
        type: "code",
        code: codeLines.join("\n"),
        language,
      });
      index += 1;
      continue;
    }

    const heading = trimmedLine.match(/^(#{1,4})\s+(.+)$/);

    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^[-*_]{3,}$/.test(trimmedLine)) {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmedLine)) {
      const quoteLines: string[] = [];

      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    if (/^[-*]\s+/.test(trimmedLine) || /^\d+\.\s+/.test(trimmedLine)) {
      const ordered = /^\d+\.\s+/.test(trimmedLine);
      const items: string[] = [];
      const itemPattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;

      while (index < lines.length && itemPattern.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(itemPattern, ""));
        index += 1;
      }

      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !isBlockStart(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" "),
    });
  }

  return blocks;
}

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(
        <code className="rounded bg-amber-200/10 px-1.5 py-0.5 text-amber-100" key={match.index}>
          {match[2]}
        </code>,
      );
    } else if (match[3] && match[4]) {
      const isExternal = /^https?:\/\//.test(match[4]);
      parts.push(
        <a
          className="text-amber-200 underline decoration-amber-200/40 underline-offset-4 transition hover:text-amber-100"
          href={match[4]}
          key={match.index}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {match[3]}
        </a>,
      );
    } else if (match[5]) {
      parts.push(
        <strong className="font-semibold text-amber-100" key={match.index}>
          {match[5]}
        </strong>,
      );
    } else if (match[6]) {
      parts.push(
        <em className="text-amber-50/90" key={match.index}>
          {match[6]}
        </em>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function headingClass(level: number) {
  if (level === 1) {
    return "text-3xl font-bold text-amber-100 font-avant";
  }

  if (level === 2) {
    return "pt-5 text-2xl font-semibold text-amber-100 font-avant";
  }

  return "pt-3 text-xl font-semibold text-amber-100";
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="space-y-5 text-base leading-7 text-amber-50/85">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3" | "h4";

          return (
            <HeadingTag className={headingClass(block.level)} key={index}>
              {renderInline(block.text)}
            </HeadingTag>
          );
        }

        if (block.type === "code") {
          return (
            <pre className="overflow-x-auto rounded-lg border border-amber-200/10 bg-black/60 p-4 text-sm leading-6 text-amber-50/90" key={index}>
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";

          return (
            <ListTag className={`space-y-2 pl-6 ${block.ordered ? "list-decimal" : "list-disc"}`} key={index}>
              {block.items.map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote className="border-l-2 border-amber-200/40 pl-5 text-amber-50/75" key={index}>
              {renderInline(block.text)}
            </blockquote>
          );
        }

        if (block.type === "hr") {
          return <hr className="border-amber-200/10" key={index} />;
        }

        return <p key={index}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
