import { Button } from "antd";
import type { NextPage } from "next";
import Login from '../pages/content/login'
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Login />
      </div>
    </div>
  );
};

export default Home;
