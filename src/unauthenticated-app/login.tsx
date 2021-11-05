import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync();
  // useDocumentTitle('登录和注册');
  const handleSubmit = async (event: {
    username: string;
    password: string;
  }) => {
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    // const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    await run(
      login(event).catch((e: Error) => {
        onError(e);
      })
    );
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type={"text"} placeholder={"请输入用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder={"请输入密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
