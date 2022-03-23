import Head from "next/head";
import useLocalStorage from "hooks/useLocalStorage";

import Footer from "./footer";
import Header from "./header";

export default function Layout({ children, data }) {
  const [darkMode, setDarkMode] = useLocalStorage(`theme`, `light`);

  return (
    <>
      <Head>
        <title>{data.setting.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={data.setting.title} key="title" />
      </Head>
      <div className={darkMode === `dark` ? `dark` : ``}>
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-800`}>
          <Header
            setting={data.setting}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <main>{children}</main>
          <Footer setting={data.setting} />
        </div>
      </div>
    </>
  );
}
