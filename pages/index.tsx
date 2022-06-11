import { Button, Col, Form } from "antd";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  useSession,
} from "next-auth/react";
import {FC} from 'react'
import {providers} from "next-auth/core/routes";

const ProvidersLoginForm:FC<any> = ({ providers: any }) => {
  const router = useRouter();
  const onFinish = (values: any) => {
    router.push("/content/computations");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
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
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => signIn(provider.id)}
                style={{
                  width: "100%",
                  height: "45px",
                  fontSize: "17px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
              >
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
        </Form>
      </Col>
    </div>
  );
};

const Home: React.FC<any> = ({ providers: any }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/content/computations");
  };

  const { data: session } = useSession();

  return <>{!session && <ProvidersLoginForm providers={providers} />}</>;
};

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Home;
