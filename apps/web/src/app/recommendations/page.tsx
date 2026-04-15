import Link from "next/link";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";

const alternatives = [
  {
    id: "vibe-b",
    title: "Romantic Garden",
    summary: "레이스 디테일과 피치 플라워로 부드러운 분위기 강화",
    tags: ["Alt B", "Romantic"]
  },
  {
    id: "vibe-c",
    title: "Modern Minimal",
    summary: "실루엣 대비를 살린 미니멀 컨셉 + 스튜디오 조명 최적화",
    tags: ["Alt C", "Minimal"]
  }
] as const;

export default function RecommendationPage() {
  return (
    <NativeShell
      activeNav="saved"
      kicker="Recommendation"
      title="메인 1안 + 대안 2안"
      subtitle="우선 메인 1안을 추천하고, 취향 충돌 대비 대안을 함께 제공합니다."
      floatingAction={
        <Link className="mt2-button" href="/comparison">
          A/B 비교하기
        </Link>
      }
    >
      <section className="mt2-grid">
        <article className="mt2-card strong">
          <h2>Main Pick A</h2>
          <p>Warm Spring 팔레트 + 웨이브 실루엣 조합으로 예식장 조명 조건에 최적화된 안입니다.</p>
          <VisualBlock title="Main A" subtitle="Elegant Film Concept" tone="rose" />
          <div className="mt2-pill-row">
            <span className="mt2-pill">Dress: A-line Satin</span>
            <span className="mt2-pill">Tuxedo: Charcoal Classic</span>
            <span className="mt2-pill">Concept: Elegant Film</span>
          </div>
        </article>

        <div className="mt2-grid two">
          {alternatives.map((option) => (
            <article key={option.id} className="mt2-card soft">
              <h3>{option.title}</h3>
              <p>{option.summary}</p>
              <div className="mt2-pill-row">
                {option.tags.map((tag) => (
                  <span key={tag} className="mt2-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </NativeShell>
  );
}
