import { Button, Col } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { url } from "inspector";
import { useEffect } from "react";

export async function getServerSideProps(context:any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const Home = ({ providers }: { providers: any }) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/content/computations");
    }
  }, [session]);

  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
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
            <>
              {Object.values(providers).map((provider: any) => (
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
                    {" "}
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
            </>
          )}
        </Col>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          zIndex: -9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
          background: "rgba(0,0,0,.4)",
        }}
      >
        <video style={{ position: "relative" }} loop autoPlay muted>
          <source src="video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Home;
