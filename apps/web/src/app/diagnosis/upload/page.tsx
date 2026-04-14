import Link from "next/link";
import { AppShell } from "../../_components/app-shell";

export default function DiagnosisUploadPage() {
  return (
    <AppShell activeNav="diagnosis" subtitle="사진 업로드" title="자동 진단용 사진">
      <article className="mt-card">
        <h2>퍼스널 컬러 사진</h2>
        <ul className="mt-list">
          <li>머리카락과 몸을 가린 맨얼굴</li>
          <li>자연광 또는 균일 조명</li>
          <li>필터/보정 없는 원본</li>
        </ul>
        <div className="mt-field">업로드 필드 자리 (Phase 1 구현 예정)</div>
      </article>

      <article className="mt-card">
        <h2>골격 진단 사진</h2>
        <ul className="mt-list">
          <li>전신이 드러나는 정면 사진</li>
          <li>신체 라인을 확인할 수 있는 복장</li>
          <li>배경이 단순한 환경 권장</li>
        </ul>
        <div className="mt-field">업로드 필드 자리 (Phase 1 구현 예정)</div>
        <div className="mt-actions">
          <Link className="mt-button" href="/results/personal-color">
            진단 결과 보기
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
