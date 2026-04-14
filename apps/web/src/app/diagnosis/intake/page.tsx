import Link from "next/link";

import { NativeShell } from "../../_components/native-shell";

export default function DiagnosisIntakePage() {
  return (
    <NativeShell
      activeNav="diagnosis"
      kicker="Diagnosis Intake"
      title="진단 결과 입력"
      subtitle="신부/신랑 진단 요약을 입력하면 추천 엔진이 바로 매칭을 시작합니다."
    >
      <section className="mt2-grid auto">
        <article className="mt2-card strong">
          <h2>신부 진단 요약</h2>
          <p>퍼스널컬러와 골격 타입을 입력해 드레스/헤어/메이크업 추천 기준을 확정합니다.</p>
          <div className="mt2-pill-row">
            <span className="mt2-pill">퍼스널컬러: 봄 라이트</span>
            <span className="mt2-pill">골격: 웨이브</span>
          </div>
          <ul className="mt2-list">
            <li>선호 드레스 무드: 로맨틱, 페미닌</li>
            <li>메이크업 톤: 코랄/피치</li>
            <li>예식장 채광: 실내 웜톤 조명</li>
          </ul>
        </article>

        <article className="mt2-card soft">
          <h2>신랑 진단 요약</h2>
          <p>골격/톤 기준으로 턱시도 핏과 헤어 스타일 우선순위를 정합니다.</p>
          <div className="mt2-pill-row">
            <span className="mt2-pill">퍼스널컬러: 가을 뮤트</span>
            <span className="mt2-pill">골격: 스트레이트</span>
          </div>
          <ul className="mt2-list">
            <li>선호 턱시도: 클래식 블랙</li>
            <li>헤어: 다운 포마드</li>
            <li>충돌 시 기본 정책: A안 우선</li>
          </ul>
        </article>
      </section>

      <section className="mt2-card">
        <h3>입력 후 처리</h3>
        <p>저장 즉시 10초 이내 첫 추천/재추천 SLA를 기준으로 결과를 제공합니다.</p>
        <div className="mt2-progress" role="img" aria-label="입력 완료율 70%">
          <span style={{ width: "70%" }} />
        </div>
        <div className="mt2-actions">
          <Link href="/diagnosis/upload" className="mt2-button ghost">
            사진 진단으로 보완
          </Link>
          <Link href="/results/personal-color" className="mt2-button">
            추천 결과 보기
          </Link>
        </div>
      </section>
    </NativeShell>
  );
}
