// 请求列表的自定义hook
import { useEffect, useCallback } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { Project } from "../types/project";

// Partial<T> 可以快速把某个接口类型中定义的属性变成可选的(Optional)：
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
// 添加项目
export const useAddProjects = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
// 编辑项目收藏
export const useEditProjects = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync<Project[]>();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
