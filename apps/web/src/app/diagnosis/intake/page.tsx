"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { NativeShell } from "../../_components/native-shell";
import { patchFlowState, readFlowState } from "../../_lib/p0-flow-state";
import { submitExperiencedIntake } from "../../_lib/p0-api-client";

const SEASONS = ["SPRING", "SUMMER", "AUTUMN", "WINTER"] as const;
const TONES = ["LIGHT", "BRIGHT", "SOFT", "MUTE", "DEEP", "CLEAR"] as const;
const UNDERTONES = ["WARM", "COOL", "NEUTRAL"] as const;
const SKELETONS = ["STRAIGHT", "WAVE", "NATURAL"] as const;

export default function DiagnosisIntakePage() {
  const router = useRouter();
  const [season, setSeason] = useState<(typeof SEASONS)[number]>("SPRING");
  const [tone, setTone] = useState<(typeof TONES)[number]>("BRIGHT");
  const [undertone, setUndertone] = useState<(typeof UNDERTONES)[number]>("WARM");
  const [skeleton, setSkeleton] = useState<(typeof SKELETONS)[number]>("WAVE");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);

  const handleSubmit = async () => {
    const state = readFlowState();
    setIsSubmitting(true);
    setStatusText(null);

    try {
      const response = await submitExperiencedIntake({
        profileId: state.profileId,
        season,
        tone,
        undertone,
        skeletonType: skeleton,
      });

      if (!response.success) {
        setStatusText(`저장 실패: ${response.error.message}`);
        return;
      }

      patchFlowState({
        gateChoice: "EXPERIENCED",
        intakeId: response.data.intakeId,
      });

      setStatusText(`저장 완료: ${response.data.status}`);
      router.push("/results/personal-color");
    } catch {
      setStatusText("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="mt2-pill">퍼스널컬러: {season}</span>
            <span className="mt2-pill">톤: {tone}</span>
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
            <span className="mt2-pill">언더톤: {undertone}</span>
            <span className="mt2-pill">골격: {skeleton}</span>
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
        <div className="mt2-grid two">
          <label>
            Season
            <select value={season} onChange={(event) => setSeason(event.target.value as (typeof SEASONS)[number])}>
              {SEASONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tone
            <select value={tone} onChange={(event) => setTone(event.target.value as (typeof TONES)[number])}>
              {TONES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Undertone
            <select
              value={undertone}
              onChange={(event) => setUndertone(event.target.value as (typeof UNDERTONES)[number])}
            >
              {UNDERTONES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Skeleton
            <select
              value={skeleton}
              onChange={(event) => setSkeleton(event.target.value as (typeof SKELETONS)[number])}
            >
              {SKELETONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt2-progress" role="img" aria-label="입력 완료율 100%">
          <span style={{ width: "100%" }} />
        </div>
        <div className="mt2-actions">
          <Link href="/diagnosis/upload" className="mt2-button ghost">
            사진 진단으로 보완
          </Link>
          <button className="mt2-button" onClick={() => void handleSubmit()} disabled={isSubmitting} type="button">
            저장 후 결과 보기
          </button>
        </div>
        {statusText ? <p>{statusText}</p> : null}
      </section>
    </NativeShell>
  );
}
