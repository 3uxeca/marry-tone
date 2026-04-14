import Image from "next/image";
import Link from "next/link";

import { NativeShell } from "../_components/native-shell";

export default function CoachPage() {
  return (
    <NativeShell
      activeNav="checklist"
      kicker="Coach Insights"
      title="코칭 대시보드"
      subtitle="진단 결과를 예식 준비 실행안으로 변환합니다."
      floatingAction={
        <Link className="mt2-button" href="/checklist">
          실행 항목 보기
        </Link>
      }
    >
      <article className="mt2-card strong">
        <Image
          src="/stitch/_12/screen.png"
          alt="코칭 인사이트 대시보드 참고 이미지"
          className="mt2-media"
          width={1080}
          height={1920}
        />
        <h2>이번 주 코칭 핵심</h2>
        <p>
          피부 톤 조화, 실루엣 밸런스, 촬영 콘셉트 일관성을 기준으로 우선 실행해야 할 3개 액션을
          도출했습니다.
        </p>
      </article>

      <section className="mt2-grid auto">
        <article className="mt2-card">
          <h3>스타일 일치도</h3>
          <p>드레스/턱시도 톤 매칭이 안정 구간으로 진입했습니다.</p>
          <div className="mt2-pill-row">
            <span className="mt2-pill">88 / 100</span>
          </div>
        </article>
        <article className="mt2-card soft">
          <h3>촬영 준비도</h3>
          <p>배경 톤과 의상 대비가 권장값에 가까워졌습니다.</p>
          <div className="mt2-pill-row">
            <span className="mt2-pill">92 / 100</span>
          </div>
        </article>
        <article className="mt2-card">
          <h3>예식장 적합도</h3>
          <p>조도, 동선, 메이크업 지속성을 고려한 설정이 반영되었습니다.</p>
          <div className="mt2-pill-row">
            <span className="mt2-pill">A Policy Applied</span>
          </div>
        </article>
      </section>

      <article className="mt2-card">
        <h3>추천 실행 순서</h3>
        <ul className="mt2-list">
          <li>헤어/메이크업 리허설 톤 샘플 2종 촬영</li>
          <li>본식/스냅 촬영 구도별 포즈 카드 확정</li>
          <li>예식장 조명 시뮬레이션 결과 기반 피드백 반영</li>
        </ul>
        <div className="mt2-actions">
          <Link className="mt2-button ghost" href="/results/personal-color">
            진단 결과 다시 보기
          </Link>
          <Link className="mt2-button" href="/consensus">
            합의안 업데이트
          </Link>
        </div>
      </article>
    </NativeShell>
  );
}
