import Link from "next/link";

import { NativeShell } from "../../_components/native-shell";
import { VisualBlock } from "../../_components/visual-block";

export default function SkeletonResultPage() {
  return (
    <NativeShell
      activeNav="saved"
      kicker="Body Diagnosis"
      title="골격 진단 결과"
      subtitle="신체 비율 지표를 바탕으로 웨딩 의상 실루엣 우선순위를 제안합니다."
    >
      <section className="mt2-grid">
        <article className="mt2-card strong">
          <h2>웨이브 타입 우세</h2>
          <p>상체 곡선과 관절 대비를 기반으로 부드러운 라인이 가장 안정적입니다.</p>
          <VisualBlock title="Body Frame" subtitle="Wave dominant" tone="sky" />
          <div className="mt2-pill-row">
            <span className="mt2-pill">Confidence 82%</span>
            <span className="mt2-pill">Primary: Wave</span>
            <span className="mt2-pill">Secondary: Natural</span>
          </div>
          <ul className="mt2-list">
            <li>드레스: 허리선이 보이는 A-line, 과한 직선 구조는 최소화</li>
            <li>턱시도: 어깨 패드 강도는 중간 이하, 허리 피팅 강조</li>
            <li>헤어/메이크업: 측면 볼륨보다 세로 결 정리가 비율 보정에 유리</li>
          </ul>
          <div className="mt2-progress" aria-label="Skeleton confidence">
            <span style={{ width: "82%" }} />
          </div>
          <div className="mt2-actions">
            <Link className="mt2-button" href="/recommendations">
              골격 기준 추천 보기
            </Link>
          </div>
        </article>
      </section>
    </NativeShell>
  );
}
