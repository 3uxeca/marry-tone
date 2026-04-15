"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";
import { createComparisonSet } from "../_lib/p0-api-client";
import { patchFlowState, readFlowState } from "../_lib/p0-flow-state";

export default function ComparisonPage() {
  const state = readFlowState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const boards = useMemo(() => {
    if (state.recommendations.length > 0) {
      return state.recommendations.slice(0, 2).map((item, index) => ({
        key: index === 0 ? "A" : "B",
        title: `${index === 0 ? "A" : "B"}안 ${item.isMain ? "(기본 정책)" : ""}`.trim(),
        summary: item.summary,
        optionId: item.optionId,
      }));
    }

    return [
      {
        key: "A",
        title: "A안 (기본 정책)",
        summary: "추천 생성 후 옵션을 비교할 수 있습니다.",
        optionId: "",
      },
      {
        key: "B",
        title: "B안",
        summary: "추천 생성 후 옵션을 비교할 수 있습니다.",
        optionId: "",
      },
    ];
  }, [state.recommendations]);

  const handleCreateComparisonSet = async () => {
    const candidateCardIds = state.optionIds
      .map((optionId) => state.cardIdsByOption[optionId])
      .filter((cardId): cardId is string => Boolean(cardId));

    if (candidateCardIds.length < 2) {
      setError("비교 세트를 만들 카드가 부족합니다. 먼저 추천을 생성해주세요.");
      return;
    }

    const cardIds = candidateCardIds.length >= 3
      ? [candidateCardIds[0], candidateCardIds[1], candidateCardIds[2]] as [string, string, string]
      : [candidateCardIds[0], candidateCardIds[1]] as [string, string];

    setIsSubmitting(true);
    setError(null);
    setStatusText(null);

    try {
      const response = await createComparisonSet({
        profileId: state.profileId,
        cardIds,
      });

      if (!response.success) {
        setError(response.error.message);
        return;
      }

      patchFlowState({
        comparisonSetId: response.data.comparisonSetId,
        selectedOptionId: state.optionIds[0],
      });
      setStatusText(`비교 세트 생성 완료: ${response.data.comparisonSetId}`);
    } catch {
      setError("비교 세트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NativeShell
      activeNav="saved"
      kicker="A/B Decision"
      title="커플 비교 보드"
      subtitle="같은 조건에서 룩, 헤어, 촬영 컨셉을 나란히 비교하고 최종안을 고릅니다."
    >
      <section className="mt2-grid">
        <div className="mt2-grid two">
          {boards.map((board) => (
            <article key={board.key} className="mt2-card">
              <h3>{board.title}</h3>
              <p>{board.summary}</p>
              <VisualBlock
                title={`${board.key} Board`}
                subtitle="Dress · Tuxedo · Concept"
                tone={board.key === "A" ? "plum" : "slate"}
                aspect="square"
              />
              <ul className="mt2-list">
                <li>드레스/턱시도 조합 가독성</li>
                <li>예식장 톤과 배경 조화</li>
                <li>촬영 컨셉 일관성</li>
              </ul>
            </article>
          ))}
        </div>

        <article className="mt2-card strong">
          <h2>최종 선택</h2>
          <p>취향이 충돌하면 기본 정책에 따라 A안을 우선 채택합니다.</p>
          <div className="mt2-actions">
            <button className="mt2-button" onClick={() => void handleCreateComparisonSet()} disabled={isSubmitting} type="button">
              비교 세트 저장 후 체크리스트 이동
            </button>
            <Link className="mt2-button ghost" href="/recommendations">
              추천 조정하기
            </Link>
          </div>
          {statusText ? <p>{statusText}</p> : null}
          {error ? <p>{error}</p> : null}
        </article>
      </section>
    </NativeShell>
  );
}
