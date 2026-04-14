import Link from "next/link";

const routes = [
  ["/home", "_1 Home"],
  ["/diagnosis/gate", "_2 Diagnosis Gate"],
  ["/diagnosis/intake", "_3 Diagnosis Intake"],
  ["/diagnosis/upload", "_4 Photo Diagnosis"],
  ["/saved", "_5 Saved"],
  ["/results/personal-color", "_6 Personal Color"],
  ["/results/skeleton", "_7 Skeleton"],
  ["/recommendations", "_8 Recommendations"],
  ["/comparison", "_9 Comparison"],
  ["/consensus", "_10 Consensus"],
  ["/checklist", "_11 Checklist"],
  ["/coach", "_12 Coach"],
  ["/my", "_13 My"],
] as const;

export default function LandingPage() {
  return (
    <main className="page-shell">
      <section className="card">
        <p className="eyebrow">MarryTone</p>
        <h1>Routed UI Pages</h1>
        <p>stitch_marrytone `_1 ~ _13` 기준의 실제 라우트 페이지입니다.</p>
        <div className="route-grid">
          {routes.map(([href, label]) => (
            <Link className="cta-link" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="cta-row">
          <Link className="cta-link ghost" href="/ui/stitch">
            Reference Preview
          </Link>
        </div>
      </section>
    </main>
  );
}
