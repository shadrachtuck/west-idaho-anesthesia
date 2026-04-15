'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * @param {{ name: string; image: { sourceUrl?: string; altText?: string } | null }[]} rows
 */
export default function TeamProviderGrid({ rows }) {
  if (!rows?.length) {
    return null;
  }
  return (
    <ul className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 list-none p-0 m-0">
      {rows.map((row, i) => {
        const src = row.image?.sourceUrl;
        const alt =
          (row.image?.altText != null && String(row.image.altText).trim()) || row.name;
        return (
          <motion.li
            key={`${row.name}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
            className="flex min-w-0 w-full flex-col bg-white border border-wia-border rounded-xl overflow-hidden shadow-sm"
          >
            <div className="relative aspect-[4/5] w-full bg-wia-surface">
              {src ? (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-wia-accent-light to-wia-surface p-2">
                  <span className="font-display text-2xl text-wia-navy/35">
                    {row.name.slice(0, 1)}
                  </span>
                </div>
              )}
            </div>
            <p className="px-3 py-3 font-sans text-sm md:text-base text-wia-body text-center font-medium leading-snug">
              {row.name}
            </p>
          </motion.li>
        );
      })}
    </ul>
  );
}
