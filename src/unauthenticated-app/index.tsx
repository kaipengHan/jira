import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

const UnauthenticatedApp = () => {
  const [register, setRegister] = useState(false);
  return (
    <div>
      {register ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setRegister(!register)}>
        {register ? "切换到登录" : "切换到注册"}
      </button>
    </div>
  );
};

export default UnauthenticatedApp;
