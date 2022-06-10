import { Button } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/content/computations");
  };

  return (
      <div className={styles.container}>
        <div className={styles.main}>
          <Button type="primary" size="large" onClick={handleClick}>
            {" "}
            Go to map{" "}
          </Button>
        </div>
      </div>
  );
};

export default Home;
