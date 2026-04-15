import Link from "next/link";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";

export default function MyPage() {
  return (
    <NativeShell
      activeNav="my"
      kicker="My MarryTone"
      title="내 프로필"
      subtitle="진단 요약, 빠른 실행, 다음 추천 액션을 확인하세요."
    >
      <article className="mt2-card strong">
        <VisualBlock title="My Profile" subtitle="진단/추천 상태 요약" tone="rose" aspect="square" />
        <h2>다샤 & 파트너</h2>
        <p>예식 D-128 · 추천 플랜 버전 v1.2 · 체크리스트 100% 완료</p>
        <div className="mt2-pill-row">
          <span className="mt2-pill">Bride Tone: Soft Summer</span>
          <span className="mt2-pill">Groom Frame: Straight</span>
          <span className="mt2-pill">Status: Ready</span>
        </div>
      </article>

      <section className="mt2-grid two">
        <article className="mt2-card">
          <h3>Quick Actions</h3>
          <div className="mt2-actions">
            <Link className="mt2-button ghost" href="/saved">
              저장 보드
            </Link>
            <Link className="mt2-button ghost" href="/comparison">
              선호 비교
            </Link>
            <Link className="mt2-button ghost" href="/consensus">
              합의 보드
            </Link>
          </div>
        </article>
        <article className="mt2-card soft">
          <h3>Diagnosis Shortcut</h3>
          <p>진단 경험 유무 기반으로 빠른 재진단 또는 신규 업로드를 시작할 수 있습니다.</p>
          <div className="mt2-actions">
            <Link className="mt2-button" href="/diagnosis/gate">
              진단 시작
            </Link>
            <Link className="mt2-button ghost" href="/results/skeleton">
              골격 결과
            </Link>
          </div>
        </article>
      </section>

      <article className="mt2-card">
        <h3>추천 다음 단계</h3>
        <ul className="mt2-list">
          <li>최종 1안을 웨딩홀 상담 일정에 반영</li>
          <li>스냅 촬영 작가에게 컨셉 보드 공유</li>
          <li>본식 전 리허설 룩북 PDF 다운로드</li>
        </ul>
      </article>
    </NativeShell>
  );
}
