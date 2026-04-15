import Link from "next/link";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";

const vaultCards = [
  {
    id: "dress-main",
    title: "Main Look",
    caption: "A-line satin dress + pearl veil",
    tags: ["Elegant", "Soft Warm"]
  },
  {
    id: "tuxedo-main",
    title: "Partner Look",
    caption: "Classic black tuxedo + blush boutonniere",
    tags: ["Classic", "Balanced"]
  }
] as const;

export default function SavedPage() {
  return (
    <NativeShell
      activeNav="saved"
      kicker="Saved Vault"
      title="저장된 스타일 보드"
      subtitle="커플이 저장한 후보를 한 번에 비교하고 최종안으로 고정할 수 있어요."
    >
      <section className="mt2-grid">
        <article className="mt2-card strong">
          <h2>Couple Vault Snapshot</h2>
          <p>최근 저장한 스타일 묶음을 기준으로 A/B 비교 보드를 자동 구성합니다.</p>
          <VisualBlock title="Vault Board" subtitle="저장 후보 묶음" tone="plum" />
          <div className="mt2-pill-row">
            <span className="mt2-pill">4 Looks Saved</span>
            <span className="mt2-pill">2 Ready To Compare</span>
          </div>
          <div className="mt2-actions">
            <Link className="mt2-button" href="/comparison">
              비교 보드 열기
            </Link>
            <Link className="mt2-button ghost" href="/recommendations">
              추천 다시 보기
            </Link>
          </div>
        </article>

        <div className="mt2-grid two">
          {vaultCards.map((card) => (
            <article key={card.id} className="mt2-card soft">
              <h3>{card.title}</h3>
              <p>{card.caption}</p>
              <div className="mt2-pill-row">
                {card.tags.map((tag) => (
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
