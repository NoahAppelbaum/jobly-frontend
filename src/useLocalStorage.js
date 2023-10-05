import { useState, useEffect } from "react";

function useLocalStorage(key) {
  const [value, setValue] = useState(key || null);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}


export default useLocalStorage;
