import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          type="image/x-icon"
          rel="shortcut icon"
          href="/favicon/favicon.ico"
        />
        <link
          type="image/png"
          sizes="32x32"
          rel="icon"
          href="/favicon/favicon-32x32.png"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="myportal"></div>
      </body>
    </Html>
  );
}
