import Image from 'next/image';

/**
 * ACF / WPGraphQL MediaItem (node with sourceUrl, altText, mediaDetails).
 */
export default function AcfImage({ node, className, imgClassName, sizes, priority }) {
  const src = node?.sourceUrl;
  if (!src) {
    return null;
  }
  const alt = node?.altText != null ? String(node.altText).trim() : '';
  const w = node?.mediaDetails?.width;
  const h = node?.mediaDetails?.height;
  const imgCls = imgClassName ?? 'w-full h-auto rounded-lg shadow-sm';
  if (w && h && w > 0 && h > 0) {
    return (
      <div className={className}>
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          className={imgCls}
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }
  return (
    <div className={className}>
      <div className="relative w-full aspect-[16/10] max-h-[min(70vh,520px)] overflow-hidden rounded-lg bg-wia-border/25 shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes ?? '(max-width: 768px) 100vw, min(896px, 90vw)'}
          priority={priority}
        />
      </div>
    </div>
  );
}
