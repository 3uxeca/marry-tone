import Link from "next/link";
import { AppShell } from "../_components/app-shell";

export default function MyPage() {
  return (
    <AppShell activeNav="my" subtitle="마이페이지" title="프로필">
      <article className="mt-card">
        <h2>이지은 님</h2>
        <p>커플 연결 상태: 연결됨</p>
      </article>

      <article className="mt-card">
        <h2>빠른 메뉴</h2>
        <div className="mt-actions">
          <Link className="mt-button" href="/results/personal-color">
            나의 진단 결과
          </Link>
          <Link className="mt-button ghost" href="/checklist">
            체크리스트
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
