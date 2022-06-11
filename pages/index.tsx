import { Button, Col } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { url } from "inspector";


const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/content/computations");
  };

  const { data: session } = useSession();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundImage: `url("/background_image.jpg")`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
        {!session && (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => signIn()}
            style={{
              width: "100%",
              height: "45px",
              fontSize: "17px",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            Sign in
          </Button>
        )}
      {session && (
        <>
              Signed in as {session.user?.email} <br />
              <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => signOut()}
            style={{
              width: "100%",
              height: "45px",
              fontSize: "17px",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            Sign out
          </Button>
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
               onClick={handleClick}>
                {" "}
                Go to map{" "}
              </Button>
        </>
      )}
      </Col>
    </div>
  );
};

export default Home;
