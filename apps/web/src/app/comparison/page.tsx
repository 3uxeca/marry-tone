import Link from "next/link";
import { AppShell } from "../_components/app-shell";

export default function ComparisonPage() {
  return (
    <AppShell activeNav="saved" subtitle="비교 보드" title="후보 비교">
      <article className="mt-card">
        <h2>드레스 비교</h2>
        <ul className="mt-list">
          <li>후보 A: 톤 적합도 92 / 무드 적합도 88</li>
          <li>후보 B: 톤 적합도 86 / 무드 적합도 91</li>
        </ul>
      </article>
      <article className="mt-card">
        <h2>턱시도 비교</h2>
        <ul className="mt-list">
          <li>후보 A: 핏 안정감 우수</li>
          <li>후보 B: 촬영 컷 밸런스 우수</li>
        </ul>
      </article>
      <article className="mt-card">
        <div className="mt-actions">
          <Link className="mt-button" href="/consensus">
            합의 보드로 이동
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
