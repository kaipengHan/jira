import { useEffect, useState } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: any) =>
  value === undefined || value === null || value === "";

// let a: object
// a = {name: 'jack'}
// a = () => {
// }
// a = new RegExp('')
//
// let b: { [key: string]: unknown }  控制键值对的对象
// b = {name: 'Jack'}
// b = () => {}
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const debounce = (func: () => void, wait?: number) => {
  let timer: any = null;
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      // @ts-ignore
      func(...args);
    }, wait);
  };
};

export const useDebounce = <V>(value: V, wait?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => setDebounceValue(value), wait);
    return () => {
      clearTimeout(timer);
    };
  }, [value, wait]);
  return debounceValue;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

export const useArray = <P>(persons: P[]) => {
  const [_persons, _setPersons] = useState<P[]>(persons);
  function add(person: P) {
    const newPerson = _persons.concat([person]);
    _setPersons(newPerson);
  }
  function removeIndex(index: number) {
    _setPersons(_persons.filter((_, i) => i !== index));
  }
  function clear() {
    _setPersons([]);
  }
  return { value: _persons, add, removeIndex, clear };
};
