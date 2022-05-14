import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CR Clan Manager</title>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#c3a447" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
