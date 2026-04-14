import Link from "next/link";

import { NativeShell } from "../../_components/native-shell";

export default function DiagnosisGatePage() {
  return (
    <NativeShell
      activeNav="diagnosis"
      kicker="Diagnosis Gate"
      title="진단 경험이 있으신가요?"
      subtitle="경험 유무에 따라 가장 짧은 경로로 추천을 시작합니다."
    >
      <section className="mt2-grid two">
        <article className="mt2-card strong">
          <h2>경험 있음</h2>
          <p>이미 받은 퍼스널컬러/골격 진단 결과를 입력해 빠르게 추천을 진행합니다.</p>
          <img
            className="mt2-media"
            src="/stitch/_2/screen.png"
            alt="Diagnosis experience available"
          />
          <div className="mt2-pill-row">
            <span className="mt2-pill">즉시 입력</span>
            <span className="mt2-pill">재진단 생략</span>
          </div>
          <div className="mt2-actions">
            <Link href="/diagnosis/intake" className="mt2-button">
              결과 입력하기
            </Link>
          </div>
        </article>

        <article className="mt2-card soft">
          <h2>경험 없음</h2>
          <p>업로드 가이드를 따라 사진을 제출하면 자동 진단 후 결과를 채워줍니다.</p>
          <img
            className="mt2-media"
            src="/stitch/_4/screen.png"
            alt="Diagnosis experience unavailable"
          />
          <div className="mt2-pill-row">
            <span className="mt2-pill">사진 업로드</span>
            <span className="mt2-pill">자동 분석</span>
          </div>
          <div className="mt2-actions">
            <Link href="/diagnosis/upload" className="mt2-button">
              업로드 시작
            </Link>
          </div>
        </article>
      </section>
    </NativeShell>
  );
}
