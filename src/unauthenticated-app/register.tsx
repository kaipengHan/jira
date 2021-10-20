import React from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

const RegisterScreen = () => {
  const { register } = useAuth();
  // event: FormEvent<HTMLFormElement>
  const handleSubmit = (event: { username: string; password: string }) => {
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    // const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    register(event);
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
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
