import Link from "next/link";

type NativeNavKey = "home" | "diagnosis" | "saved" | "checklist" | "my";

type NativeShellProps = {
  activeNav: NativeNavKey;
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  floatingAction?: React.ReactNode;
};

const navItems: Array<{ href: string; key: NativeNavKey; label: string }> = [
  { href: "/home", key: "home", label: "Home" },
  { href: "/diagnosis/gate", key: "diagnosis", label: "Diagnosis" },
  { href: "/saved", key: "saved", label: "Saved" },
  { href: "/checklist", key: "checklist", label: "Checklist" },
  { href: "/my", key: "my", label: "My" }
];

export function NativeShell({
  activeNav,
  kicker,
  title,
  subtitle,
  children,
  floatingAction
}: NativeShellProps) {
  return (
    <main className="mt2-shell">
      <header className="mt2-topbar">
        <div className="mt2-topbar-brand">
          <span className="mt2-crown" aria-hidden>
            ♦
          </span>
          <p>MarryTone</p>
        </div>
        <button className="mt2-topbar-bell" type="button" aria-label="Notifications">
          •
        </button>
      </header>

      <section className="mt2-content">
        <div className="mt2-page-head">
          <p className="mt2-kicker">{kicker}</p>
          <h1>{title}</h1>
          {subtitle ? <p className="mt2-subtitle">{subtitle}</p> : null}
        </div>
        {children}
      </section>

      {floatingAction ? <div className="mt2-floating-action">{floatingAction}</div> : null}

      <nav className="mt2-bottom-nav" aria-label="Main Navigation">
        {navItems.map((item) => {
          const selected = item.key === activeNav;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={selected ? "mt2-nav-item is-active" : "mt2-nav-item"}
            >
              <span className="mt2-nav-dot" aria-hidden>
                •
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
