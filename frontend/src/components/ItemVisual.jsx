// The "image" for an item: a colour field derived from the item's hue with its emoji on top.
// Purely decorative, so it is hidden from assistive technology; the text next to it carries the meaning.
export default function ItemVisual({ item, className = '' }) {
  return (
    <div className={`visual ${className}`.trim()} style={{ '--hue': item.hue }} aria-hidden="true">
      <span className="visual__emoji">{item.emoji}</span>
    </div>
  );
}
