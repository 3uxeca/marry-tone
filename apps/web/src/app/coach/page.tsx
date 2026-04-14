import Link from "next/link";
import { AppShell } from "../_components/app-shell";

export default function CoachPage() {
  return (
    <AppShell activeNav="home" subtitle="스타일 코치" title="코칭 요약">
      <article className="mt-card">
        <h2>오늘의 코칭</h2>
        <p>퍼스널 컬러와 골격 결과를 기준으로 소재, 넥라인, 볼륨 밸런스를 같이 맞추세요.</p>
      </article>
      <article className="mt-card">
        <h2>추천 액션</h2>
        <ul className="mt-list">
          <li>드레스 피팅 시 허리선 강조 실루엣 우선 확인</li>
          <li>턱시도는 상하 대비를 줄여 커플 톤 통일</li>
          <li>촬영 소품은 블러시 핑크 + 아이보리 팔레트 유지</li>
        </ul>
        <div className="mt-actions">
          <Link className="mt-button" href="/recommendations">
            추천으로 이동
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
