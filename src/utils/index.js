import { useEffect, useState } from "react";

export const debounce = (func, wait) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func(...args);
    }, wait);
  };
};

export const useDebounce = (value, wait) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => setDebounceValue(value), wait);
    return () => {
      clearTimeout(timer);
    };
  }, [value, wait]);
  return debounceValue;
};
