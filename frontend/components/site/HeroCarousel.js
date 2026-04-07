'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUTO_MS = 6000;

/**
 * Full-bleed hero carousel: image, centered overlay copy, dot indicators.
 *
 * @param {{ src: string; alt?: string; overlay: string }[]} slides
 */
export default function HeroCarousel({ slides }) {
  const n = slides.length;
  const [active, setActive] = useState(0);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % n);
  }, [n]);

  useEffect(() => {
    if (n <= 1) return undefined;
    const id = setInterval(advance, AUTO_MS);
    return () => clearInterval(id);
  }, [n, advance]);

  if (n === 0) {
    return null;
  }

  const current = slides[active];

  return (
    <div
      className="relative w-full min-h-[min(58vh,20rem)] sm:min-h-[min(62vh,24rem)] md:min-h-[28rem] overflow-hidden bg-wia-navy"
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage highlights"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.src + active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        >
          <Image
            src={current.src}
            alt={current.alt || ''}
            fill
            className="object-cover opacity-70"
            sizes="100vw"
            priority={active === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/10" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
            <p className="max-w-4xl text-center font-sans text-lg sm:text-xl md:text-2xl font-semibold italic leading-snug text-white drop-shadow-md whitespace-pre-line">
              {current.overlay}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {n > 1 ? (
        <div className="absolute bottom-4 sm:bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={
                i === active
                  ? 'h-2.5 w-8 rounded-full bg-white shadow-sm transition-all'
                  : 'h-2.5 w-2.5 rounded-full bg-white/55 hover:bg-white/80 transition-all'
              }
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
