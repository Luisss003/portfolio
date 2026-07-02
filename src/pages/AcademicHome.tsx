import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/other_bg.jpg"; // Import the background image
import { blogPosts } from "../content/blog/blogPosts";

type NewsItem = {
  date: string;
  title: string;
  href?: string;
  to?: string;
};

function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(date))
    .toUpperCase();
}

export default function AcademicHome() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const blogNewsItems = useMemo<NewsItem[]>(
    () =>
      blogPosts
        .filter((post) => post.showInNews)
        .map((post) => ({
          date: post.date,
          title: post.newsTitle ?? `Published "${post.title}"`,
          to: `/blog/${post.slug}`,
        })),
    [],
  );

  useEffect(() => {
    let isMounted = true;

    fetch(`${import.meta.env.BASE_URL}news.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load recent news.");
        }

        return response.json() as Promise<NewsItem[]>;
      })
      .then((items) => {
        if (isMounted) {
          setNewsItems(items);
        }
      })
      .catch(() => {
        if (isMounted) {
          setNewsItems([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const recentNews = useMemo(
    () =>
      [...newsItems]
        .concat(blogNewsItems)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .slice(0, 3),
    [blogNewsItems, newsItems],
  );

  return (
    // Outer wrapper handles the background image and overall layout
    <div 
      className="relative min-h-full w-full bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay provides the darkness (bg-black/70) and the blur effect */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Main content wrapper, raised above the overlay with z-10 */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 text-amber-50">
        <div className="grid gap-12 md:grid-cols-[1fr_300px]">
          
          {/* Left Column: Bio & Research */}
          <section className="space-y-10">
            <header>
              <h1 className="text-4xl font-bold text-amber-100 font-avant">Luis A. Saenz</h1>
              <p className="text-xl text-amber-200/80 mt-2">
                M.S. Student, Computer Science @ UT San Antonio
              </p>
            </header>

            <article className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                I am a Master's student in Computer Science at the University of Texas at San Antonio (UTSA). My interests lie in understanding software and computer systems at a low level: how they are built, how they fail, and how those failures can be analyzed, exploited, and secured.
                <br /><br />
                Given everything in computing is becoming more and more abstracted, so I believe low-level systems knowledge is becoming increasingly rare. Through my research, projects, and YouTube channel, Luis' Low Level, I aim to connect academic systems concepts with practical system hardening and software exploitation.
              </p>
            </article>

            <section>
              <h2 className="text-2xl font-semibold border-b border-amber-200/20 pb-2 mb-4 font-avant">Research Interests</h2>
              <ul className="grid list-disc list-inside grid-cols-1 gap-2 text-amber-50/90 md:grid-cols-2">
                <li>Systems Security</li>
                <li>Binary Program Analysis</li>
                <li>Reverse Engineering</li>
                <li>Coverage-Guided Fuzzing</li>
                <li>Exploitability Analysis</li>

              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold border-b border-amber-200/20 pb-2 mb-4 font-avant">Recent News</h2>
              <ul className="space-y-4">
                {recentNews.map((item) => (
                  <li className="flex gap-4" key={`${item.date}-${item.title}`}>
                    <span className="w-20 shrink-0 text-amber-200/60 font-mono">{formatNewsDate(item.date)}</span>
                    {item.to ? (
                      <Link className="text-amber-50/90 underline decoration-amber-200/40 underline-offset-4 transition hover:text-amber-200" to={item.to}>
                        {item.title}
                      </Link>
                    ) : item.href ? (
                      <a href={item.href} className="text-amber-50/90 underline decoration-amber-200/40 underline-offset-4 transition hover:text-amber-200">
                        {item.title}
                      </a>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </section>

          {/* Right Column: Contact/Links (Sidebar Style) */}
          <aside className="space-y-8">
            <div className="rounded-xl border border-amber-200/10 bg-[#140607] p-6">
              <h3 className="text-sm uppercase tracking-widest text-amber-200/50 mb-4">Contact</h3>
              <div className="space-y-2 text-sm">
                <p>luis.saenz.compsci@gmail.com</p>
                <div className="pt-4 flex flex-col gap-2 font-semibold">
                  <a href="/LuisSaenzCV.pdf" className="hover:text-amber-200 transition">Curriculum Vitae (PDF)</a>
                  <a href="#" className="hover:text-amber-200 transition">Google Scholar</a>
                  <a href="https://www.youtube.com/@LuisSaenz-RevEng" className="hover:text-amber-200 transition" target="_blank" rel="noopener noreferrer">
                    YouTube Channel
                  </a>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
