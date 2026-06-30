import { Link, useParams } from "react-router-dom";
import bg from "../assets/other_bg.jpg";
import { MarkdownContent } from "../components/MarkdownContent";
import { Navbar } from "../components/Navbar";
import { formatPublishedDate, getBlogPost } from "../content/blog/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="relative min-h-full w-full bg-black bg-cover bg-center text-amber-50" style={{ backgroundImage: `url(${bg})` }}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <Navbar />
        <main className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-20">
          <h1 className="text-3xl font-bold text-amber-100 font-avant">Post Not Found</h1>
          <Link className="mt-6 inline-block text-amber-200 underline decoration-amber-200/40 underline-offset-4" to="/blog">
            Back to Blog
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-full w-full bg-black bg-cover bg-center text-amber-50" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-20">
        <Link className="text-sm font-semibold text-amber-200/70 transition hover:text-amber-100" to="/blog">
          Back to Blog
        </Link>

        <article className="mt-8">
          <header className="border-b border-amber-200/10 pb-8">
            <h1 className="text-4xl font-bold text-amber-100 font-avant">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-amber-200/60">
              <time dateTime={post.date}>{formatPublishedDate(post.date)}</time>
              <span>{post.readTime}</span>
            </div>

            {post.summary ? (
              <p className="mt-5 text-lg leading-relaxed text-amber-50/75">{post.summary}</p>
            ) : null}

            {post.tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-medium text-amber-100/90" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <div className="mt-8">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </main>
    </div>
  );
}
