import React from 'react'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

import '../styles/globals.css'

// used for rendering equations (optional)
import 'react-notion-x/build/third-party/equation.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
