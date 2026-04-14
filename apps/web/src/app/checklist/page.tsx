import { AppShell } from "../_components/app-shell";

const tasks = [
  ["드레스 최종 확정", true],
  ["턱시도 최종 확정", true],
  ["헤어/메이크업 확정", false],
  ["촬영 컨셉 확정", true],
  ["예식장 환경 확정", false],
] as const;

export default function ChecklistPage() {
  const done = tasks.filter((task) => task[1]).length;
  const progress = Math.round((done / tasks.length) * 100);

  return (
    <AppShell activeNav="checklist" subtitle="진행률 관리" title="웨딩 준비 체크리스트">
      <article className="mt-card">
        <h2>진행률 {progress}%</h2>
        <div className="mt-progress">
          <div className="mt-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p>체크리스트 100% 완료 시 MVP 완료로 처리됩니다.</p>
      </article>

      <article className="mt-card">
        <h2>할 일 목록</h2>
        <ul className="mt-list">
          {tasks.map((task) => (
            <li key={task[0]}>{task[1] ? `완료 · ${task[0]}` : `진행중 · ${task[0]}`}</li>
          ))}
        </ul>
      </article>
    </AppShell>
  );
}
