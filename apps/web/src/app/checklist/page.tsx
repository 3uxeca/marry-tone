"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";
import { fetchChecklist, type ChecklistItem } from "../_lib/p0-api-client";
import { readFlowState } from "../_lib/p0-flow-state";

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileId] = useState(() => readFlowState().profileId);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchChecklist(profileId);
        if (!response.success) {
          if (mounted) {
            setError(response.error.message);
          }
          return;
        }

        if (mounted) {
          setItems(response.data.items);
        }
      } catch {
        if (mounted) {
          setError("체크리스트 조회 중 오류가 발생했습니다.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      mounted = false;
    };
  }, [profileId]);

  const completedCount = useMemo(
    () => items.filter((item) => item.status === "COMPLETED").length,
    [items],
  );
  const total = items.length;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <NativeShell
      activeNav="checklist"
      kicker="MVP Checklist"
      title="완료 체크리스트"
      subtitle="필수 항목 100% 완료 시 MVP 완료로 처리됩니다."
    >
      <article className="mt2-card strong">
        <VisualBlock title="Checklist" subtitle="진행률 추적 보드" tone="mint" aspect="square" />
        <h2>
          진행률 {completedCount}/{total} ({progress}%)
        </h2>
        <div className="mt2-progress" aria-label={`체크리스트 진행률 ${progress}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>모든 항목이 완료되어 최종 추천안 확정 단계를 진행할 수 있습니다.</p>
      </article>

      {progress === 100 ? (
        <article className="mt2-card soft">
          <h3>완료 처리 가능</h3>
          <p>체크리스트 100%를 충족했습니다. 이제 예식 준비 패키지를 완료 상태로 전환할 수 있습니다.</p>
        </article>
      ) : null}

      <article className="mt2-card">
        <h3>항목 상세</h3>
        {loading ? <p>체크리스트를 불러오는 중입니다...</p> : null}
        {error ? <p>{error}</p> : null}
        <ul className="mt2-list">
          {items.map((item) => (
            <li
              key={item.key}
              style={{
                textDecoration: item.status === "COMPLETED" ? "line-through" : "none",
                opacity: item.status === "COMPLETED" ? 0.75 : 1,
              }}
            >
              {item.status === "COMPLETED" ? "완료" : "대기"} · {item.label}
            </li>
          ))}
        </ul>
        <div className="mt2-actions">
          <Link className="mt2-button ghost" href="/consensus">
            합의 보드로 이동
          </Link>
          <Link className="mt2-button" href="/my">
            완료 상태 확인
          </Link>
        </div>
      </article>
    </NativeShell>
  );
}
