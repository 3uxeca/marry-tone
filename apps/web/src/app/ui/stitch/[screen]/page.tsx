import Link from "next/link";
import { notFound } from "next/navigation";

type StitchScreenPageProps = {
  params: {
    screen: string;
  };
};

function toScreenNumber(raw: string): number {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 13) {
    return -1;
  }

  return parsed;
}

export default function StitchScreenPage({ params }: StitchScreenPageProps) {
  const screenNumber = toScreenNumber(params.screen);
  if (screenNumber === -1) {
    notFound();
  }

  const screenLabel = `_${screenNumber}`;

  return (
    <main className="stitch-viewer-page">
      <header className="stitch-viewer-header">
        <Link href="/ui/stitch">Back</Link>
        <h1>Stitch Reference {screenLabel}</h1>
      </header>
      <section className="stitch-iframe-wrap">
        <img
          alt={`stitch ${screenLabel} preview`}
          className="stitch-screen-image"
          loading="lazy"
          src={`/stitch/${screenLabel}/screen.png`}
        />
      </section>
    </main>
  );
}
