import Link from "next/link";

const screens = Array.from({ length: 13 }, (_, index) => index + 1);

export default function StitchReferenceIndexPage() {
  return (
    <main className="stitch-page">
      <header className="stitch-header">
        <p className="stitch-eyebrow">UI Reference</p>
        <h1>Stitch MarryTone Screens (_1 ~ _13)</h1>
        <p>원본 HTML/CSS 기반 레퍼런스를 Next.js 앱 안에서 검토할 수 있는 프리뷰 페이지입니다.</p>
      </header>

      <section className="stitch-grid">
        {screens.map((screen) => {
          const screenLabel = `_${screen}`;
          return (
            <article className="stitch-card" key={screen}>
              <Link className="stitch-thumb-link" href={`/ui/stitch/${screen}`}>
                <img
                  alt={`stitch ${screenLabel} preview`}
                  className="stitch-thumb"
                  loading="lazy"
                  src={`/stitch/${screenLabel}/screen.png`}
                />
              </Link>
              <div className="stitch-card-body">
                <h2>{screenLabel}</h2>
                <div className="stitch-actions">
                  <Link href={`/ui/stitch/${screen}`}>App Preview</Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
