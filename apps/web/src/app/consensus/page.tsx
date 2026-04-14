import Link from "next/link";
import { AppShell } from "../_components/app-shell";

export default function ConsensusPage() {
  return (
    <AppShell activeNav="home" subtitle="커플 합의" title="충돌 해결 보드 (A 정책)">
      <article className="mt-card">
        <h2>기본 정책</h2>
        <p>취향이 충돌할 때 기본 정책은 A로 진행합니다.</p>
      </article>
      <article className="mt-card">
        <h2>최종안 선택</h2>
        <ul className="mt-list">
          <li>드레스: 후보 A 확정</li>
          <li>턱시도: 후보 A 확정</li>
          <li>촬영 컨셉: 후보 B 확정</li>
        </ul>
        <div className="mt-actions">
          <Link className="mt-button" href="/checklist">
            체크리스트 생성
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
