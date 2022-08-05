import Script from 'next/script'
import "@/styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script async defer data-website-id="82aa1129-0f3a-41d8-810d-dbbc5fe88c55" src="https://umami-sandy-three.vercel.app/u.js" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
