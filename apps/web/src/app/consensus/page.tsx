import Image from "next/image";
import Link from "next/link";

import { NativeShell } from "../_components/native-shell";

export default function ConsensusPage() {
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
        <Image
          src="/stitch/_10/screen.png"
          alt="합의 보드 레이아웃 참고 이미지"
          className="mt2-media square"
          width={1080}
          height={1920}
        />
        <h2>최종 합의안 1안</h2>
        <p>
          기본 정책 A를 적용해 드레스, 턱시도, 헤어/메이크업, 촬영 컨셉, 예식장 환경을 하나의 안으로
          정리했습니다.
        </p>
        <div className="mt2-pill-row">
          <span className="mt2-pill">Dress: Soft Romantic</span>
          <span className="mt2-pill">Tuxedo: Classic Navy</span>
          <span className="mt2-pill">Hall: Warm Ivory</span>
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
          <li>충돌 항목 2건 정책 A로 해소</li>
          <li>후보 3안 중 선호도 점수 최고안 선택</li>
          <li>체크리스트 100% 완료 시 완료 처리</li>
        </ul>
        <div className="mt2-actions">
          <Link className="mt2-button ghost" href="/checklist">
            체크리스트 열기
          </Link>
          <Link className="mt2-button" href="/coach">
            최종 1안 확정
          </Link>
        </div>
      </article>
    </NativeShell>
  );
}
