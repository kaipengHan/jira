import React, { ReactNode, useCallback } from "react";
import { User } from "types/user";
import * as auth from "../../src/auth-provider";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageLoading } from "../components/Lib";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "store/auth.slice";
import { selectUser, bootstrap } from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

// 初始化user 防止刷新页面丢失user
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const { run, isIdle, isLoading, setData: setUser } = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  return <div>{children}</div>;
};

export default AuthProvider;

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
