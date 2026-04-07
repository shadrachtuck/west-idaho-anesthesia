import '../faust.config';
import React from 'react';
import { useRouter } from 'next/compat/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import { futura } from '../fonts';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <div
        className={`${futura.variable} font-sans antialiased text-wia-body bg-wia-surface min-h-screen`}
      >
        <Component {...pageProps} key={router?.asPath ?? '/'} />
      </div>
    </FaustProvider>
  );
}
