import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

const RegisterScreen = ({ onError }: { onError: (e: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  // event: FormEvent<HTMLFormElement>
  const handleSubmit = async ({
    cPassword,
    ...value
  }: {
    username: string;
    password: string;
    cPassword: string;
  }) => {
    if (cPassword !== value.password) {
      onError(new Error("请确认两次输入的密码是否相同"));
      return;
    }
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    // const password = (event.currentTarget.elements[1] as HTMLFormElement).value;

    await run(
      register(value).catch((e: Error) => {
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
      <Form.Item
        name={"cPassword"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder={"请确认密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
