import { NavLink } from "react-router-dom";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
          "border border-slate-800/60",
          isActive
            ? "bg-slate-900/60 text-slate-100"
            : "bg-transparent text-slate-200 hover:bg-slate-900/40 hover:text-slate-100",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="mx-auto flex h-14 items-center justify-between gap-6 px-4
                      rounded-2xl border border-white/10
                      bg-black/30 backdrop-blur-md shadow-lg">

        <nav className="hidden sm:flex items-center gap-2">
          <NavItem to="/about" label="About" />
          <NavItem to="/projects" label="Projects" />
          <NavItem to="/contact" label="Contact" />
        </nav>
      </div>
    </header>
  );
}
