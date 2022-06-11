import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Grid, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import { url } from "inspector";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter()
  const onFinish = (values:any) => {
    console.log("Received values of form: ", values);
    router.push('/content/computations')
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Col
        style={{
          height: "450px",
          width: "400px",
          maxWidth: "400px",
          borderRadius: 12,
          backgroundColor: "white",
          boxShadow: "0px 3px 26px -7px rgba(0, 70, 143, 0.5)",
          paddingLeft: "25px",
          paddingRight: "25px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src="/logo.png" width="200px" height="200px" />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              style={{
                borderRadius: "5px",
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              style={{
                borderRadius: "5px",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                width: "100%",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            >
              Log in
            </Button>
            <div
              style={{
                marginLeft: "15px",
                marginTop: "15px",
              }}
            >
              Or <a href="">register now!</a>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default LoginForm;
