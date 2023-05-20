import { GA_TRACKING_ID, pageview } from "@/googleanalytics";
import PageLayout from "@/layout/PageLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const routerChangeHandler = (url: string) => pageview(url);
    router.events.on("routeChangeComplete", routerChangeHandler);
    return () => {
      router.events.off("routeChangeComplete", routerChangeHandler);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Zip URL | zippit</title>
        <meta
          name="description"
          content="Shorten your URLs quickly and securely with our reliable URL shortener service. Boost your social media presence and track link clicks. Try it now!"
        />
        <meta name="keywords" content="url,shotern,zip,shortener,compress,link,reliable" />
        <meta name="robots" content="index, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="language" content="en" />

        <meta property="og:title" content="Zip URL | Best URL Shortener Service" />
        <meta
          property="og:description"
          content="Shorten your URLs quickly and securely with our reliable URL shortener service. Boost your social media presence and track link clicks. Try it now!"
        />
        <meta property="og:url" content="https://zippit.io" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Zip URL | Best URL Shortener Service" />
        <meta
          name="twitter:description"
          content="Shorten your URLs quickly and securely with our reliable URL shortener service. Boost your social media presence and track link clicks. Try it now!"
        />
        <meta name="twitter:url" content="https://zippit.io" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </>
  );
}
