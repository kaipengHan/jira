import { useState } from "react";
import { useMountedRef } from "./url";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};

// typeof str 获取str数据的类型
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef(); // 当前页面的挂载状态
  // useState直接传入函数的含义是：惰性初始化，所以要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });
  // 触发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请输入Promise类型数据");
    }
    setRetry(() => () => {
      console.log("set retry");
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current)
          // 如果当前页面是挂载状态 采取设置data
          setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) throw new Error(error);
        return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    setData,
    setError,
    retry,
    run,
    ...state,
  };
};
