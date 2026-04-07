import { useRouter } from 'next/router';
import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../../constants/siteBrand';

/** viewBox 65.46 × 86.7 — use native <img> so SVG + embedded raster works reliably (avoid next/image quirks). */
const LOGO_RATIO = 65.46 / 86.7;

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {number} [props.height] — intrinsic height hint (CSS can override)
 * @param {number} [props.intrinsicWidth] — if set, width/height attrs match ~this width (for desktop absolute mark)
 */
export default function SiteLogo({ className, height = 70, intrinsicWidth }) {
  const { basePath } = useRouter();
  const src = `${basePath || ''}${SITE_LOGO_SRC}`;
  let w;
  let h;
  if (intrinsicWidth != null) {
    w = intrinsicWidth;
    h = Math.round(intrinsicWidth / LOGO_RATIO);
  } else {
    h = height;
    w = Math.round(h * LOGO_RATIO);
  }

  return (
    <img
      src={src}
      alt={SITE_LOGO_ALT}
      width={w}
      height={h}
      className={className}
      draggable={false}
    />
  );
}
