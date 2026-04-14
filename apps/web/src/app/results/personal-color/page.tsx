import Image from "next/image";
import Link from "next/link";

import { NativeShell } from "../../_components/native-shell";

const palette = ["Warm Ivory", "Peach Rose", "Dusty Coral", "Champagne Gold"] as const;

export default function PersonalColorResultPage() {
  return (
    <NativeShell
      activeNav="saved"
      kicker="Diagnosis Result"
      title="퍼스널 컬러 진단"
      subtitle="신부/신랑 공통 톤을 고려한 메인 팔레트와 스타일 근거입니다."
    >
      <section className="mt2-grid">
        <article className="mt2-card strong">
          <h2>Warm Spring Harmony</h2>
          <p>피부 톤 대비와 채도 반응을 기준으로 생기를 가장 잘 살리는 범위입니다.</p>
          <Image
            src="/stitch/_6/screen.png"
            alt="Personal color result sample"
            width={1080}
            height={1920}
            className="mt2-media"
            priority
          />
          <div className="mt2-pill-row">
            {palette.map((tone) => (
              <span key={tone} className="mt2-pill">
                {tone}
              </span>
            ))}
          </div>
          <ul className="mt2-list">
            <li>드레스: 아이보리 기반에 복숭아 계열 포인트가 얼굴 톤을 밝게 보정</li>
            <li>턱시도: 깊은 블랙보다 차콜/웜 블랙이 피부톤과 충돌이 적음</li>
            <li>부케/소품: 샴페인 골드 메탈릭이 사진에서 피부 광을 안정화</li>
          </ul>
          <div className="mt2-actions">
            <Link className="mt2-button" href="/recommendations">
              이 팔레트로 추천 받기
            </Link>
          </div>
        </article>
      </section>
    </NativeShell>
  );
}
