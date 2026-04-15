import Link from "next/link";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";

const boards = [
  {
    key: "A",
    title: "A안 (기본 정책)",
    summary: "우아한 무드 중심의 안정형 구성"
  },
  {
    key: "B",
    title: "B안",
    summary: "로맨틱 요소를 늘린 감성형 구성"
  }
] as const;

export default function ComparisonPage() {
  return (
    <NativeShell
      activeNav="saved"
      kicker="A/B Decision"
      title="커플 비교 보드"
      subtitle="같은 조건에서 룩, 헤어, 촬영 컨셉을 나란히 비교하고 최종안을 고릅니다."
    >
      <section className="mt2-grid">
        <div className="mt2-grid two">
          {boards.map((board) => (
            <article key={board.key} className="mt2-card">
              <h3>{board.title}</h3>
              <p>{board.summary}</p>
              <VisualBlock
                title={`${board.key} Board`}
                subtitle="Dress · Tuxedo · Concept"
                tone={board.key === "A" ? "plum" : "slate"}
                aspect="square"
              />
              <ul className="mt2-list">
                <li>드레스/턱시도 조합 가독성</li>
                <li>예식장 톤과 배경 조화</li>
                <li>촬영 컨셉 일관성</li>
              </ul>
            </article>
          ))}
        </div>

        <article className="mt2-card strong">
          <h2>최종 선택</h2>
          <p>취향이 충돌하면 기본 정책에 따라 A안을 우선 채택합니다.</p>
          <div className="mt2-actions">
            <Link className="mt2-button" href="/checklist">
              A안 확정 후 체크리스트 이동
            </Link>
            <Link className="mt2-button ghost" href="/recommendations">
              추천 조정하기
            </Link>
          </div>
        </article>
      </section>
    </NativeShell>
  );
}
