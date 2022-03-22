import { debounce } from "lodash";
import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [size, setSize] = useState(
    typeof window === "object" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = debounce((e) => {
      if (size !== window.innerWidth) {
        setSize(window.innerWidth);
      }
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  return size;
}
