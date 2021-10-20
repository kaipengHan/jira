import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import { Button, Card } from "antd";

const UnauthenticatedApp = () => {
  const [register, setRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {register ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={() => setRegister(!register)}>
          {register ? "切换到登录" : "切换到注册"}
        </Button>
      </Card>
    </div>
  );
};

export default UnauthenticatedApp;
