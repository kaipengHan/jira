// 请求列表的自定义hook
import { useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { Project } from "../types/project";

// Partial<T> 可以快速把某个接口类型中定义的属性变成可选的(Optional)：
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
