import styles from "../styles/notes.module.css";
import Head from "next/head";
import { GrSync } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import NoteBody from "../components/body";

export default function Notes() {
  const [userInfo, setUserInfo] = useState({});

  return (
    <div className={styles.app_box}>
      <Head>
        <title>My notes</title>
      </Head>
      <nav className={styles.nav_box}>
        <p>keeper.</p>
        <input placeholder="Search" />
        <div className={styles.btn_box}>
          <button title="Sync Changes">
            <GrSync style={{ fontSize: "1.3rem" }} />
          </button>
          <div>S</div>
        </div>
      </nav>
      <NoteBody userInfo={userInfo} />
    </div>
  );
}
