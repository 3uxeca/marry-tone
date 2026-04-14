import Link from "next/link";

import { NativeShell } from "../_components/native-shell";

export default function HomeRoutePage() {
  return (
    <NativeShell
      activeNav="home"
      kicker="Editorial Pick"
      title="오늘의 웨딩 톤 큐레이션"
      subtitle="메인 1안과 카테고리별 대안 3안까지 한 번에 비교하세요."
      floatingAction={
        <Link href="/diagnosis/gate" className="mt2-button">
          진단 시작
        </Link>
      }
    >
      <section className="mt2-card strong">
        <div className="mt2-grid two">
          <article>
            <h2>메인 추천: 로맨틱 페일 핑크 무드</h2>
            <p>예식장 라이트와 피부 톤을 같이 반영해 드레스, 턱시도, 메이크업 톤을 맞춘 메인 1안입니다.</p>
            <div className="mt2-pill-row">
              <span className="mt2-pill">Soft Spring</span>
              <span className="mt2-pill">Wave</span>
              <span className="mt2-pill">Natural Glow</span>
            </div>
          </article>
          <img
            className="mt2-media"
            src="/stitch/_3/screen.png"
            alt="MarryTone home hero preview"
          />
        </div>
        <div className="mt2-actions">
          <Link href="/recommendations" className="mt2-button">
            메인안 상세 보기
          </Link>
          <Link href="/comparison" className="mt2-button ghost">
            3안 비교하기
          </Link>
        </div>
      </section>

      <section className="mt2-grid auto">
        <article className="mt2-card">
          <h3>대안 A: 클래식 블러시</h3>
          <p>단정한 실루엣과 은은한 볼륨 헤어로 격식 있는 무드.</p>
          <img
            className="mt2-media square"
            src="/stitch/_8/screen.png"
            alt="Alternative style A preview"
          />
        </article>
        <article className="mt2-card soft">
          <h3>대안 B: 모던 미니멀</h3>
          <p>톤다운 화이트와 샤프한 턱시도 라인 조합.</p>
          <img
            className="mt2-media square"
            src="/stitch/_9/screen.png"
            alt="Alternative style B preview"
          />
        </article>
        <article className="mt2-card">
          <h3>대안 C: 가든 내추럴</h3>
          <p>야외/반야외 예식장에 맞춘 생화 느낌 스타일.</p>
          <img
            className="mt2-media square"
            src="/stitch/_5/screen.png"
            alt="Alternative style C preview"
          />
        </article>
      </section>

      <section className="mt2-card">
        <h3>다음 단계</h3>
        <p>두 분의 진단 정보가 있으면 추천 정확도가 올라갑니다.</p>
        <ul className="mt2-list">
          <li>퍼스널컬러/골격 진단 보유 여부 확인</li>
          <li>필요 시 사진 업로드로 자동 진단</li>
          <li>체크리스트 100% 완료 시 최종 확정</li>
        </ul>
        <div className="mt2-actions">
          <Link href="/diagnosis/gate" className="mt2-button">
            진단 플로우로 이동
          </Link>
        </div>
      </section>
    </NativeShell>
  );
}
