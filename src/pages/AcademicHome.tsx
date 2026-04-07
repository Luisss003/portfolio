import bg from "../assets/other_bg.jpg"; // Import the background image

export default function AcademicHome() {
  return (
    // Outer wrapper handles the background image and overall layout
    <div 
      className="relative min-h-screen w-full bg-black bg-cover bg-center"
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
                I am a Graduate Research Assistant at the <strong>University of Texas at San Antonio (UTSA)</strong>. 
                My research focuses on <strong>automated vulnerability analysis</strong>, <strong>binary analysis</strong>, 
                and the security of low-level systems.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                I run the YouTube channel <a href="https://www.youtube.com/@LuisSaenz-RevEng" className="text-amber-200 underline">Luis' Low Level</a>, 
                where I produce educational content on reverse engineering and software exploitation, 
                bridging the gap between academic theory and practical "hacking."
              </p>
            </article>

            {/* Research Interests (Adam Doupé Style) */}
            <section>
              <h2 className="text-2xl font-semibold border-b border-amber-200/20 pb-2 mb-4 font-avant">Research Interests</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-amber-50/90">
                <li>Systems Security</li>
                <li>Binary Analysis</li>
                <li>Reverse Engineering</li>
                <li>Machine Learning for Vulnerability Research</li>

              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold border-b border-amber-200/20 pb-2 mb-4 font-avant">Recent News</h2>
              <ul className="space-y-4">
               <li className="flex gap-4">
                  <span className="text-amber-200/60 font-mono">MAR 2026</span>
                  <span>Released a deep-dive series on Monte Carlo Tree Search for adversarial AI.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-amber-200/60 font-mono">MAY 2025</span>
                  <span>Graduated Summa Cum Laude with B.S. in Computer Science (3.98 GPA).</span>
                </li>
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
                  <a href="#" className="hover:text-amber-200 transition">Curriculum Vitae (PDF)</a>
                  <a href="#" className="hover:text-amber-200 transition">Google Scholar</a>
                  <a href="#" className="hover:text-amber-200 transition">YouTube Channel</a>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}