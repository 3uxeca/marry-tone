type VisualTone = "rose" | "plum" | "sky" | "mint" | "sand" | "slate";
type VisualAspect = "portrait" | "square" | "wide";

type VisualBlockProps = {
  title: string;
  subtitle: string;
  tone?: VisualTone;
  aspect?: VisualAspect;
};

export function VisualBlock({
  title,
  subtitle,
  tone = "rose",
  aspect = "portrait"
}: VisualBlockProps) {
  return (
    <div className={`mt2-visual mt2-visual--${tone} mt2-visual--${aspect}`} role="img" aria-label={title}>
      <p className="mt2-visual-title">{title}</p>
      <p className="mt2-visual-subtitle">{subtitle}</p>
      <div className="mt2-visual-chip-row">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
