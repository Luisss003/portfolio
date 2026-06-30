import { NavLink } from "react-router-dom";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-lg px-4 py-2 text-base font-semibold transition-colors",
          "border border-amber-200/30",
          isActive
            ? "bg-black/70 text-amber-100"
            : "bg-transparent text-amber-200/80 hover:bg-black/60 hover:text-amber-50",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 h-0 w-full pointer-events-none">
      <div className="pointer-events-auto mx-auto flex h-16 w-fit items-center justify-between gap-6 rounded-2xl border border-amber-200/30 bg-black/70 px-7 backdrop-blur-md shadow-lg">

        <nav className="hidden items-center gap-3 sm:flex">
          <NavItem to="/" label="Home" />
          <NavItem to="/research" label="Research" />
          <NavItem to="/blog" label="Blog" />
        </nav>
      </div>
    </header>
  );
}
