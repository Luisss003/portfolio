import { Link } from "react-router-dom";
import bg from "../assets/other_bg.jpg";
import { Navbar } from "../components/Navbar";
import { blogPosts, formatPublishedDate } from "../content/blog/blogPosts";

export default function BlogIndexPage() {
  return (
    <div className="relative min-h-full w-full bg-black bg-cover bg-center text-amber-50" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-amber-100 font-avant">Blog & Writeups</h1>
          <p className="mt-4 max-w-2xl text-amber-200/70">
            Notes, technical writeups, and research logs sorted by publish date.
          </p>
        </header>

        {blogPosts.length > 0 ? (
          <div className="divide-y divide-amber-200/10">
            {blogPosts.map((post) => (
              <article className="py-8 first:pt-0" key={post.slug}>
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                  <h2 className="text-2xl font-semibold text-amber-100 transition hover:text-white">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <time className="shrink-0 font-mono text-sm text-amber-200/55" dateTime={post.date}>
                    {formatPublishedDate(post.date)}
                  </time>
                </div>

                {post.summary ? (
                  <p className="mt-3 max-w-3xl leading-relaxed text-amber-50/75">{post.summary}</p>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-amber-200/50">{post.readTime}</span>
                  {post.tags.map((tag) => (
                    <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-medium text-amber-100/90" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-t border-amber-200/10 pt-8 text-amber-50/75">
            No blog posts are published yet.
          </div>
        )}
      </main>
    </div>
  );
}
