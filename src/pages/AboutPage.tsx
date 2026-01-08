import bg from "../assets/other_bg.jpg";
import { Navbar } from "../components/Navbar";

const highlights = [
  {
    label: "Focus",
    value: "Backend development."
  },
  {
    label: "Currently",
    value: "Building projects that explore optimizing academic studies via applies AI."
  },
  {
    label: "Location",
    value: "San Antonio, TX (open to relocation and remote)."
  }
];

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-black bg-cover bg-center text-amber-50"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-12">
        <header className="mb-10 space-y-3">

          <h1 className="text-3xl font-semibold text-amber-100 font-avant">
            About me!
          </h1>
        </header>

        <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <article className="rounded-2xl border border-amber-200/20 bg-[#140607] p-6">
            <h2 className="text-xl font-semibold text-amber-100 font-avant">
              The longer story
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-amber-50/90">
              My name is Luis Saenz; I am first generation university student from San Antonio, Texas. I 
              attended UTSA in 2022, and graduted in 2025 with Summa Cum Laude, recieving my Bachelor in Science in Computer Science,
              with a minor in Cybersecurity. During this time, I spent my time streghtening my knowledge in both
              thery, and implementation in software engineering. In my free time, I enjoy working in the field of
              low-level security, working on vulnerability research and malware analysis.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-amber-50/90">
                I am currently working on recieving my Master of Science in Computer Science at UTSA again, and am also working
                independently on my SaaS ErratumAI!
            </p>
          </article>

          <aside className="space-y-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-amber-200/20 bg-black/60 px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-amber-50/80">{item.value}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-200/20 bg-black/60 p-6">
          <h2 className="text-2xl font-semibold text-amber-100 font-avant">
            Skills I Work With
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
            "Backend Systems",
            "Distributed Systems",
            "Secure Software",
            "Infrastructure & DevOps",
            "Applied AI Systems",
            "Containerization"
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber-200/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-200/20 bg-[#140607] p-6">
          <h2 className="text-2xl font-semibold text-amber-100 font-avant">
            Contact
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-amber-200/20 bg-black/60 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">
                Email
              </p>
              <p className="mt-2 text-sm text-amber-50/80">luis.saenz.compsci@gmail.com</p>
            </div>
            <div className="rounded-xl border border-amber-200/20 bg-black/60 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">
                GitHub
              </p>
              <p className="mt-2 text-sm text-amber-50/80">github.com/Luisss003</p>
            </div>
            <div className="rounded-xl border border-amber-200/20 bg-black/60 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">
                LinkedIn
              </p>
              <p className="mt-2 text-sm text-amber-50/80">
                linkedin.com/in/luisarmandosaenz
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
