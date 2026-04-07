import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary type: next/font (Jost) + Futura stack in tailwind — no legacy Google families */}
      </Head>
      <body className="bg-wia-surface">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
