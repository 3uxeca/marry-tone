"use client";

import Link from "next/link";
import { useState } from "react";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";
import { patchFlowState, readFlowState } from "../_lib/p0-flow-state";
import { submitConsensus } from "../_lib/p0-api-client";

export default function ConsensusPage() {
  const state = readFlowState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedOptionId = state.selectedOptionId ?? state.optionIds[0];

  const handleConfirm = async () => {
    if (!state.recommendationId || !selectedOptionId) {
      setError("추천안이 없어 합의를 확정할 수 없습니다. 먼저 추천을 생성해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setStatusText(null);

    const groomOptionId = state.optionIds[1] ?? selectedOptionId;

    try {
      const response = await submitConsensus({
        coupleId: state.coupleId,
        recommendationId: state.recommendationId,
        selectedOptionId,
        votes: [
          {
            actor: "BRIDE",
            optionId: selectedOptionId,
            preferenceRank: 1,
            reason: "피부 톤 조화 우선",
          },
          {
            actor: "GROOM",
            optionId: groomOptionId,
            preferenceRank: 1,
            reason: "핏 안정성 우선",
          },
        ],
      });

      if (!response.success) {
        setError(response.error.message);
        return;
      }

      patchFlowState({
        consensusDecisionId: response.data.decisionId,
        selectedOptionId: response.data.selectedOptionId,
      });

      setStatusText(`합의 확정 완료: ${response.data.status}`);
    } catch {
      setError("합의 확정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NativeShell
      activeNav="checklist"
      kicker="Consensus Board"
      title="합의 보드"
      subtitle="카테고리별 3안 중 최종 1안을 확정합니다."
      floatingAction={
        <Link className="mt2-button" href="/comparison">
          비교 다시 보기
        </Link>
      }
    >
      <article className="mt2-card strong">
        <VisualBlock title="Consensus A" subtitle="합의된 최종 1안" tone="plum" aspect="square" />
        <h2>최종 합의안 1안</h2>
        <p>
          기본 정책 A를 적용해 드레스, 턱시도, 헤어/메이크업, 촬영 컨셉, 예식장 환경을 하나의 안으로
          정리했습니다.
        </p>
        <div className="mt2-pill-row">
          <span className="mt2-pill">Selected Option: {selectedOptionId ?? "N/A"}</span>
          <span className="mt2-pill">Policy: A</span>
          <span className="mt2-pill">Mode: Conflict-safe</span>
        </div>
      </article>

      <section className="mt2-grid two">
        <article className="mt2-card">
          <h3>신부 우선순위</h3>
          <ul className="mt2-list">
            <li>퍼스널컬러 톤과 일치하는 드레스 광택</li>
            <li>웨이브형 보완 실루엣</li>
            <li>로맨틱 무드 촬영 연출</li>
          </ul>
        </article>
        <article className="mt2-card soft">
          <h3>신랑 우선순위</h3>
          <ul className="mt2-list">
            <li>스트레이트 타입 균형감 있는 자켓 핏</li>
            <li>예식장 조도에서 안정적인 색상</li>
            <li>과도하지 않은 포멀 스타일</li>
          </ul>
        </article>
      </section>

      <article className="mt2-card">
        <h3>최종 확정 전 확인</h3>
        <ul className="mt2-list">
          <li>충돌 항목 발생 시 정책 A 자동 적용</li>
          <li>후보 3안 중 선호도 점수 최고안 선택</li>
          <li>체크리스트 100% 완료 시 완료 처리</li>
        </ul>
        <div className="mt2-actions">
          <Link className="mt2-button ghost" href="/checklist">
            체크리스트 열기
          </Link>
          <button className="mt2-button" onClick={() => void handleConfirm()} disabled={isSubmitting} type="button">
            최종 1안 확정
          </button>
        </div>
        {statusText ? <p>{statusText}</p> : null}
        {error ? <p>{error}</p> : null}
      </article>
    </NativeShell>
  );
}
