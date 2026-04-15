import Link from "next/link";

import { NativeShell } from "../_components/native-shell";
import { VisualBlock } from "../_components/visual-block";

const checklistItems = [
  { label: "퍼스널컬러 진단 결과 확정", done: true },
  { label: "골격 타입 분류 확인", done: true },
  { label: "드레스/턱시도 최종안 선택", done: true },
  { label: "헤어/메이크업 콘셉트 확정", done: true },
  { label: "촬영 콘셉트 및 포즈 보드 저장", done: true },
  { label: "예식장 환경/동선 체크", done: true }
];

export default function ChecklistPage() {
  const completedCount = checklistItems.filter((item) => item.done).length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);

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
          진행률 {completedCount}/{checklistItems.length} ({progress}%)
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
        <ul className="mt2-list">
          {checklistItems.map((item) => (
            <li
              key={item.label}
              style={{ textDecoration: item.done ? "line-through" : "none", opacity: item.done ? 0.75 : 1 }}
            >
              {item.done ? "완료" : "대기"} · {item.label}
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
