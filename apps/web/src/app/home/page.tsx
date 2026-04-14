import Link from "next/link";
import { AppShell } from "../_components/app-shell";

export default function HomeRoutePage() {
  return (
    <AppShell activeNav="home" subtitle="웨딩 스타일 코치" title="홈">
      <article className="mt-card">
        <h2>오늘의 추천 시작하기</h2>
        <p>사전 질문으로 진단 경로를 분기하고, 카테고리별 추천 3안과 메인 1안을 확인하세요.</p>
        <div className="mt-actions">
          <Link className="mt-button" href="/diagnosis/gate">
            진단 시작
          </Link>
          <Link className="mt-button ghost" href="/recommendations">
            추천 예시 보기
          </Link>
        </div>
      </article>

      <article className="mt-card">
        <h2>주요 동선</h2>
        <ul className="mt-list">
          <li>진단 게이트 → 업로드/입력 분기</li>
          <li>퍼스널 컬러 / 골격 결과 확인</li>
          <li>추천 결과 저장 / 비교 / 최종 확정</li>
        </ul>
      </article>
    </AppShell>
  );
}
