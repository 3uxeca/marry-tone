"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";
import { generateRecommendations, saveStyleCard } from "../_lib/p0-api-client";
import { patchFlowState, readFlowState, type RecommendationPreview } from "../_lib/p0-flow-state";

export default function RecommendationPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastStatus, setLastStatus] = useState<string | null>(null);
  const [options, setOptions] = useState<RecommendationPreview[]>(() => readFlowState().recommendations);

  const mainOption = useMemo(() => options.find((item) => item.isMain) ?? null, [options]);
  const alternatives = useMemo(() => options.filter((item) => !item.isMain), [options]);

  const handleGenerate = async (isRegenerate: boolean) => {
    const state = readFlowState();
    setIsGenerating(true);
    setError(null);

    try {
      const response = await generateRecommendations({
        profileId: state.profileId,
        coupleId: state.coupleId,
        isRegenerate,
      });

      if (!response.success) {
        setError(response.error.message);
        return;
      }

      const mappedOptions: RecommendationPreview[] = response.data.options.map((item) => ({
        optionId: item.optionId,
        rank: item.rank,
        isMain: item.isMain,
        summary: item.summary,
        title: item.suggestions[0]?.title ?? `Option ${item.rank}`,
      }));

      const cardEntries = await Promise.all(
        response.data.options.map(async (item) => {
          const first = item.suggestions[0];
          const saved = await saveStyleCard({
            profileId: response.data.profileId,
            recommendationId: response.data.recommendationId,
            optionId: item.optionId,
            title: first?.title ?? `${item.summary} 카드`,
            description: first?.description ?? item.summary,
            tags: first?.tags ?? [`rank-${item.rank}`],
            isMainOption: item.isMain,
          });

          if (!saved.success) {
            return null;
          }

          return [item.optionId, saved.data.cardId] as const;
        }),
      );

      const cardIdsByOption = cardEntries.reduce<Record<string, string>>((acc, entry) => {
        if (!entry) {
          return acc;
        }
        return {
          ...acc,
          [entry[0]]: entry[1],
        };
      }, {});

      patchFlowState({
        recommendationId: response.data.recommendationId,
        selectedOptionId: response.data.mainOptionId ?? mappedOptions[0]?.optionId,
        optionIds: mappedOptions.map((item) => item.optionId),
        recommendations: mappedOptions,
        cardIdsByOption,
      });

      setOptions(mappedOptions);
      setLastStatus(`${isRegenerate ? "재추천" : "추천"} 완료: ${response.data.status}`);
    } catch {
      setError("추천 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <NativeShell
      activeNav="saved"
      kicker="Recommendation"
      title="메인 1안 + 대안 2안"
      subtitle="우선 메인 1안을 추천하고, 취향 충돌 대비 대안을 함께 제공합니다."
      floatingAction={
        <Link className="mt2-button" href="/comparison">
          A/B 비교하기
        </Link>
      }
    >
      <section className="mt2-grid">
        <article className="mt2-card strong">
          <h2>{mainOption ? `Main Pick ${mainOption.rank}` : "Main Pick A"}</h2>
          <p>{mainOption?.summary ?? "추천을 생성하면 메인 1안이 표시됩니다."}</p>
          <VisualBlock title={mainOption?.title ?? "Main A"} subtitle="Elegant Film Concept" tone="rose" />
          <div className="mt2-pill-row">
            <span className="mt2-pill">드레스·턱시도·헤어·메이크업·촬영·예식장</span>
            <span className="mt2-pill">3안 중 메인 1안 추천</span>
            <span className="mt2-pill">충돌 시 정책 A</span>
          </div>
          <div className="mt2-actions">
            <button className="mt2-button" onClick={() => void handleGenerate(false)} disabled={isGenerating} type="button">
              추천 생성
            </button>
            <button className="mt2-button ghost" onClick={() => void handleGenerate(true)} disabled={isGenerating} type="button">
              재추천
            </button>
          </div>
          {lastStatus ? <p>{lastStatus}</p> : null}
        </article>

        <div className="mt2-grid two">
          {(alternatives.length > 0 ? alternatives : [1, 2]).map((option) => {
            if (typeof option === "number") {
              return (
                <article key={`placeholder-${option}`} className="mt2-card soft">
                  <h3>Alternative {option}</h3>
                  <p>추천 생성 후 대안이 표시됩니다.</p>
                  <div className="mt2-pill-row">
                    <span className="mt2-pill">Alt {option}</span>
                  </div>
                </article>
              );
            }

            return (
              <article key={option.optionId} className="mt2-card soft">
                <h3>{option.title}</h3>
                <p>{option.summary}</p>
                <div className="mt2-pill-row">
                  <span className="mt2-pill">Alt {option.rank}</span>
                  <span className="mt2-pill">Option {option.optionId}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      {error ? (
        <section className="mt2-card soft">
          <h3>추천 실패</h3>
          <p>{error}</p>
        </section>
      ) : null}
    </NativeShell>
  );
}
