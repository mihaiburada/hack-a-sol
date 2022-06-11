import { Button } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from 'next-auth/client'

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/content/computations");
  };


        const [session, loading] = useSession()

        if (loading) {
            return <div className={styles.container}>
                <div className={styles.main}>
                    <p>Loading...</p>
                </div>
            </div>
        }

        return (
            <>
                {!session && (
                    <><div className={styles.container}>
                        <div className={styles.main}>
                        Not signed in <br />
                        <button onClick={signIn}>Sign in</button>
                        </div>
                    </div>
                    </>
                )}
                {session && (
                    <><div className={styles.container}>
                        <div className={styles.main}>
                        Signed in as {session.user.email} <br />
                        <button onClick={signOut}>Sign out</button>
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
