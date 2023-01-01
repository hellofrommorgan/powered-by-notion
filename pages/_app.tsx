import * as React from 'react'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp
