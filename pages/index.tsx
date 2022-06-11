import { Button } from "antd";
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
            <>
                {!session && (
                    <><div className={styles.container}>
                        <div className={styles.main}>
                        Not signed in <br />
                        <Button onClick={()=>signIn()}>Sign in</Button>
                        </div>
                    </div>
                    </>
                )}
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
            </>
        )

};

export default Home;
