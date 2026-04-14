import Link from "next/link";
import { AppShell } from "../_components/app-shell";

export default function SavedPage() {
  return (
    <AppShell activeNav="saved" subtitle="보관함" title="저장한 스타일 카드">
      <article className="mt-card">
        <h2>드레스 카드</h2>
        <p>메인 후보 1건, 대안 2건 저장됨</p>
      </article>
      <article className="mt-card">
        <h2>턱시도 카드</h2>
        <p>메인 후보 1건, 대안 2건 저장됨</p>
      </article>
      <article className="mt-card">
        <div className="mt-actions">
          <Link className="mt-button" href="/comparison">
            비교하기
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
