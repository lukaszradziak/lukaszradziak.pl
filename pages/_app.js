import Script from 'next/script'
import "@/styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script async defer data-website-id="f49d748c-b363-4492-a846-595d3fa447d5" src="https://stats.lukaszradziak.pl/u.js" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
