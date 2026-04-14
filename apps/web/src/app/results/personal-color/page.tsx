import Link from "next/link";
import { AppShell } from "../../_components/app-shell";

const palette = ["#f8d4d9", "#f6b8c5", "#e9a5b2", "#d88da4"];

export default function PersonalColorResultPage() {
  return (
    <AppShell activeNav="diagnosis" subtitle="진단 결과" title="퍼스널 컬러 결과">
      <article className="mt-card">
        <h2>분석 결과: Soft Rose Tone</h2>
        <p>피부/홍채 대표색 매핑 기준으로 웨딩 톤과 조화를 우선 추천합니다.</p>
        <div className="mt-palette">
          {palette.map((color) => (
            <span className="mt-chip" key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
      </article>

      <article className="mt-card">
        <h2>추천 방향</h2>
        <ul className="mt-list">
          <li>드레스: 아이보리, 로지 베이지</li>
          <li>메이크업: 저채도 핑크/코랄 중심</li>
          <li>부케: 화이트+블러시 핑크 비율 강조</li>
        </ul>
        <div className="mt-actions">
          <Link className="mt-button" href="/results/skeleton">
            골격 결과 보기
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
