import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

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
    setSearchParam,
  ] as const;
};
