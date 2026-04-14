import Link from "next/link";
import { AppShell } from "../../_components/app-shell";

export default function DiagnosisIntakePage() {
  return (
    <AppShell activeNav="diagnosis" subtitle="기존 진단 입력" title="진단 결과 입력">
      <article className="mt-card">
        <h2>퍼스널 컬러</h2>
        <p>예: 봄 웜, 라이트 스프링 / PCCS 코드 등</p>
        <div className="mt-field">입력 필드 자리 (Phase 1 구현 예정)</div>
      </article>

      <article className="mt-card">
        <h2>골격 타입</h2>
        <p>예: 스트레이트 / 웨이브 / 내추럴</p>
        <div className="mt-field">입력 필드 자리 (Phase 1 구현 예정)</div>
        <div className="mt-actions">
          <Link className="mt-button" href="/recommendations">
            추천 받기
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
