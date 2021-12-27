import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo, useEffect, useRef } from "react";
import { cleanObject } from "./index";

/**
 * 返回页面url中  指定键的参数值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParam.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParam]
    ),
    (param: Partial<{ [key in K]: unknown }>) => {
      const obj = Object.fromEntries(searchParam);
      const o = cleanObject({ ...obj, ...param }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
    // setSearchParam
  ] as const;
};
/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载返回false 否则返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
