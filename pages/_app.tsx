import type { AppProps } from 'next/app'

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    min-height: 100vh;
  }
  a { color: #3b82f6; }
  a:hover { color: #60a5fa; }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style>{styles}</style>
      <Component {...pageProps} />
    </>
  )
}
