import { Form, Input, Button } from "antd";
import React from "react";
import "./Authentication.css";

function Login() {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div className="login-container">
      <Form
        className="border shadow py-4 px-5"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1 className="text-center mb-4">Log In</h1>
        <Form.Item
          label="Email"
          name="email"
          className="bg-none"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input className="bg-lucent" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password autoComplete="off" className="bg-lucent" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
