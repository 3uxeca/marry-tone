import Link from "next/link";

type AppNavKey = "home" | "diagnosis" | "saved" | "checklist" | "my";

type AppShellProps = {
  title: string;
  subtitle?: string;
  activeNav: AppNavKey;
  children: React.ReactNode;
};

const navItems: Array<{ key: AppNavKey; label: string; href: string }> = [
  { key: "home", label: "Home", href: "/home" },
  { key: "diagnosis", label: "Diagnosis", href: "/diagnosis/gate" },
  { key: "saved", label: "Saved", href: "/saved" },
  { key: "checklist", label: "Checklist", href: "/checklist" },
  { key: "my", label: "My", href: "/my" },
];

export function AppShell({ title, subtitle, activeNav, children }: AppShellProps) {
  return (
    <main className="mt-app-shell">
      <header className="mt-topbar">
        <div>
          <p className="mt-brand">MarryTone</p>
          <h1>{title}</h1>
          {subtitle ? <p className="mt-subtitle">{subtitle}</p> : null}
        </div>
      </header>

      <section className="mt-content">{children}</section>

      <nav className="mt-bottom-nav" aria-label="Main">
        {navItems.map((item) => {
          const selected = item.key === activeNav;
          return (
            <Link
              className={selected ? "mt-nav-item is-active" : "mt-nav-item"}
              href={item.href}
              key={item.key}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
