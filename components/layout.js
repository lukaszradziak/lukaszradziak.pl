import useLocalStorage from "hooks/useLocalStorage";

import Footer from "./footer";
import Header from "./header";

export default function Layout({ children, data }) {
  const [darkMode, setDarkMode] = useLocalStorage(`theme`, `light`);

  return (
    <div className={darkMode === `dark` ? `dark` : ``}>
      <div className={`min-h-screen dark:bg-gray-800`}>
        <Header
          setting={data.setting}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main>{children}</main>
        <Footer setting={data.setting} />
      </div>
    </div>
  );
}
