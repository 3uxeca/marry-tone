import Link from "next/link";
import { AppShell } from "../../_components/app-shell";

export default function DiagnosisGatePage() {
  return (
    <AppShell activeNav="diagnosis" subtitle="사전 질문" title="진단 경험이 있으신가요?">
      <article className="mt-card">
        <h2>경험 있음</h2>
        <p>기존 퍼스널 컬러/골격 결과를 바로 입력해서 프로세스를 간소화합니다.</p>
        <div className="mt-actions">
          <Link className="mt-button" href="/diagnosis/intake">
            결과 입력으로 이동
          </Link>
        </div>
      </article>

      <article className="mt-card">
        <h2>경험 없음</h2>
        <p>맨얼굴/전신 사진 업로드 후 자동 진단을 진행합니다.</p>
        <div className="mt-actions">
          <Link className="mt-button" href="/diagnosis/upload">
            사진 업로드로 이동
          </Link>
        </div>
      </article>
    </AppShell>
  );
}
