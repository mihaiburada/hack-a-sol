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
          height: "350px",
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                width: "100%",
                height: "45px",
                fontSize: "17px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            >
              Sign in with Google
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default LoginForm;
