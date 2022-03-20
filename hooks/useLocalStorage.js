import { useState, useEffect } from "react";

export default function useLocalStorage(name, defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(window.localStorage.getItem(name));
  }, [name]);

  const set = (value) => {
    window.localStorage.setItem(name, value);
    setValue(value);
  };

  return [value, set];
}
