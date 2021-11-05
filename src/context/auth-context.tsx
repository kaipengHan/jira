import React, { ReactNode } from "react";
import { User } from "types/user";
import * as auth from "../../src/auth-provider";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/Lib";

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

interface AuthForm {
  username: string;
  password: string;
}

// 初始化user 防止刷新页面丢失user
const bootstrapUser = async () => {
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
  const {
    run,
    isError,
    error,
    isIdle,
    isLoading,
    setData: setUser,
    data: user,
  } = useAsync<User | null>();
  useMount(() => {
    run(bootstrapUser());
    // bootstrapUser().then(setUser);
  });
  debugger;
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  const login = (form: AuthForm) =>
    auth.login(form).then((users) => setUser(users));
  const register = (form: AuthForm) =>
    auth.register(form).then((users) => setUser(users));
  const logout = () => auth.logout().then(() => setUser(null));
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
export default AuthProvider;

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
