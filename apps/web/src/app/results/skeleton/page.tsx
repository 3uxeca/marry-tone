import Link from "next/link";
import { AppShell } from "../../_components/app-shell";

export default function SkeletonResultPage() {
  return (
    <AppShell activeNav="diagnosis" subtitle="진단 결과" title="골격 타입 결과">
      <article className="mt-card">
        <h2>타입: WAVE</h2>
        <p>부드러운 곡선 라인과 가벼운 소재의 실루엣이 강점을 잘 살립니다.</p>
      </article>

      <article className="mt-card">
        <h2>스타일링 포인트</h2>
        <ul className="mt-list">
          <li>허리 라인이 살아있는 드레스 실루엣</li>
          <li>턱시도는 상체 볼륨 균형감 강조</li>
          <li>헤어는 과한 직선보다는 소프트 웨이브</li>
        </ul>
        <div className="mt-actions">
          <Link className="mt-button" href="/recommendations">
            추천 결과 보기
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
