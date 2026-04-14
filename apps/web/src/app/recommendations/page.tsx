import Link from "next/link";
import { AppShell } from "../_components/app-shell";

const categories = [
  "드레스",
  "턱시도",
  "헤어",
  "메이크업",
  "촬영 컨셉",
  "예식장 환경",
];

export default function RecommendationPage() {
  return (
    <AppShell activeNav="home" subtitle="카테고리별 최대 3안" title="메인 추천 1안">
      {categories.map((category) => (
        <article className="mt-card" key={category}>
          <h2>{category}</h2>
          <p>추천 A(메인) / 추천 B / 추천 C</p>
        </article>
      ))}

      <article className="mt-card">
        <h2>다음 단계</h2>
        <div className="mt-actions">
          <Link className="mt-button" href="/saved">
            저장함으로 이동
          </Link>
          <Link className="mt-button ghost" href="/comparison">
            비교 보드 보기
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
