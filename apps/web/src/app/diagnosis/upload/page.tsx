"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { NativeShell } from "../../_components/native-shell";
import { VisualBlock } from "../../_components/visual-block";
import { patchFlowState, readFlowState } from "../../_lib/p0-flow-state";
import { submitPhotoIntake } from "../../_lib/p0-api-client";

export default function DiagnosisUploadPage() {
  const router = useRouter();
  const [facePhotoAssetId, setFacePhotoAssetId] = useState("face-asset-001");
  const [bodyPhotoAssetId, setBodyPhotoAssetId] = useState("body-asset-001");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);

  const handleSubmit = async () => {
    const state = readFlowState();
    setIsSubmitting(true);
    setStatusText(null);

    try {
      const response = await submitPhotoIntake({
        profileId: state.profileId,
        facePhotoAssetId,
        bodyPhotoAssetId,
      });

      if (!response.success) {
        setStatusText(`업로드 처리 실패: ${response.error.message}`);
        return;
      }

      patchFlowState({
        gateChoice: "NOT_EXPERIENCED",
        intakeId: response.data.intakeId,
      });

      if (response.data.nextStep === "READY_FOR_RECOMMENDATION") {
        setStatusText("자동 진단 완료. 결과 페이지로 이동합니다.");
        router.push("/results/personal-color");
        return;
      }

      setStatusText(`저신뢰 감지(${response.data.nextStep})로 재업로드 또는 수동 입력이 필요합니다.`);
    } catch {
      setStatusText("업로드 처리 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NativeShell
      activeNav="diagnosis"
      kicker="Photo Diagnosis"
      title="사진 업로드 가이드"
      subtitle="가이드 기준을 지키면 진단 신뢰도가 가장 높게 측정됩니다."
    >
      <section className="mt2-grid two">
        <article className="mt2-card strong">
          <h2>퍼스널컬러용 사진</h2>
          <p>머리카락과 몸을 가린 맨얼굴 사진 1장을 업로드해 톤 진단을 진행합니다.</p>
          <VisualBlock title="Face Shot" subtitle="퍼스널컬러 분석용" tone="rose" />
          <ul className="mt2-list">
            <li>자연광 또는 균일 조명</li>
            <li>필터/보정 해제</li>
            <li>정면, 눈뜨고 촬영</li>
          </ul>
          <label>
            Face Asset ID
            <input value={facePhotoAssetId} onChange={(event) => setFacePhotoAssetId(event.target.value)} />
          </label>
        </article>

        <article className="mt2-card soft">
          <h2>골격 진단용 사진</h2>
          <p>전신 실루엣이 드러나는 사진으로 체형 지표를 추출해 타입을 분류합니다.</p>
          <VisualBlock title="Body Shot" subtitle="골격 분류 지표 추출" tone="sky" />
          <ul className="mt2-list">
            <li>정면/측면 각 1장 권장</li>
            <li>신체 라인이 보이는 착장</li>
            <li>왜곡이 적은 거리에서 촬영</li>
          </ul>
          <label>
            Body Asset ID
            <input value={bodyPhotoAssetId} onChange={(event) => setBodyPhotoAssetId(event.target.value)} />
          </label>
        </article>
      </section>

      <section className="mt2-card">
        <h3>개인정보 및 보안 안내</h3>
        <p>업로드된 원본 이미지는 전송/저장 구간 암호화가 적용되며, 진단 완료 후 정책 A에 따라 보관됩니다.</p>
        <div className="mt2-pill-row">
          <span className="mt2-pill">암호화 전송</span>
          <span className="mt2-pill">접근 권한 최소화</span>
          <span className="mt2-pill">진단 신뢰도 낮음 시 C정책</span>
        </div>
        <div className="mt2-actions">
          <Link href="/diagnosis/intake" className="mt2-button ghost">
            수동 입력으로 이동
          </Link>
          <button className="mt2-button" onClick={() => void handleSubmit()} disabled={isSubmitting} type="button">
            업로드 후 결과 보기
          </button>
        </div>
        {statusText ? <p>{statusText}</p> : null}
      </section>
    </NativeShell>
  );
}
