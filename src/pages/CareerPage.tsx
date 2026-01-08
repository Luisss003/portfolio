import bg from "../assets/other_bg.jpg";
import { Navbar } from "../components/Navbar";
import erratumAI from "../assets/ErratumAIUI.png"
import grader from "../assets/Grader.png"

const bestProjects = [
  {
  title: "ErratumAI: AI Textbook & Paper Correction SaaS",
  date: "November 2025 - Present",
  tech: "Java, Spring Boot, Spring AI, PostgreSQL, Redis, Docker, GCP",
  description:
    "Designed, built, and deployed an AI-powered SaaS that analyzes textbooks and academic papers to flag outdated or conflicting information. Uses an asynchronous processing pipeline with caching to support hundreds of uploads efficiently, reducing repeat analysis latency to milliseconds.",
  image: erratumAI,
  deployLabel: "Live Deployment",
  deployUrl: "https://erratumai.luissaenz.me",
  repoLabel: "Private Repository",
  repoUrl: ""
},
{
  title: "University of Texas at San Antonio: Software Engineering Grader",
  date: "August 2025 - December 2025",
  tech: "Java, Spring Boot, Django, Express.js",
  description:
    "Graded and reviewed 90+ student submissions weekly, evaluating backend architecture, design patterns, and correctness across multiple frameworks. Provided detailed feedback on API design, data modeling, and implementation quality.",
  image: grader,
  deployLabel: "",
  deployUrl: "",
  repoLabel: "",
  repoUrl: ""
}

];

export default function CareerPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-black bg-cover bg-center text-amber-50"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-12">
        {/* Best Projects */}
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold text-amber-100 font-avant">
           Professional Experience
          </h1>
        </header>

        <section className="flex flex-col gap-6">
          {bestProjects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-amber-200/20 bg-[#140607] shadow-[0_0_50px_rgba(0,0,0,0.45)]"
            >
              <div className="relative grid gap-6 p-6 md:grid-cols-[240px_1fr]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-amber-200/30 bg-[#2b1912]">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.title} preview`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#2b1912] text-amber-200/70">
                      <span className="text-xs uppercase tracking-[0.3em]">Preview</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-amber-100 font-avant">
                        {p.title}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">
                        {p.date}
                      </p>
                    </div>
                    {p.deployUrl ? (
                      <a
                        className="rounded-full border border-amber-200/40 px-4 py-1 text-xs uppercase tracking-[0.25em] text-amber-100 transition hover:border-amber-100 hover:text-amber-50"
                        href={p.deployUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {p.deployLabel || "View Live"}
                      </a>
                    ) : null}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
                    {p.tech}
                  </p>
                  <p className="text-sm leading-relaxed text-amber-50/90">
                    {p.description}
                  </p>
                  {p.repoUrl ? (
                    <a
                      className="text-xs uppercase tracking-[0.25em] text-amber-200/80 transition hover:text-amber-100"
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {p.repoLabel || "View Repo"}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </section>

        

     
      </main>
    </div>
  );
}
