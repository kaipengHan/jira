import { useEffect, useRef, useState } from "react";
// 是否为0
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 是否为空
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
// 过滤掉值为假的数据
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
// 防抖
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
// 防抖
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
// componentDidMount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};
// 数组的添加 删除 清空操作
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
// 修改页面标题  keepOnUnMount:是否上一个页面的标题
export const useDocumentTitle = (title: string, keepOnUnMount?: boolean) => {
  // const oldTitle = document.title;
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keepOnUnMount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnMount]);
};
