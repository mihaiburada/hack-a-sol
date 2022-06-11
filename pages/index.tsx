import { Button, Col } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/content/computations");
  };


        const {data:session} = useSession()


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
                {!session && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={()=>signIn()}
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
                </Col>
                {session && (
                    <><div className={styles.container}>
                        <div className={styles.main}>
                        Signed in as {session.user?.email} <br />
                        <button onClick={()=>signOut()}>Sign out</button>
                        <Button type="primary" size="large" onClick={handleClick}>
                            {" "}
                            Go to map{" "}
                        </Button>
                        </div>
                    </div>
                    </>
                )}
            </div>
        )

};

export default Home;

