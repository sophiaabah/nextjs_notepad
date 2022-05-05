import styles from "../styles/notes.module.css";
import Head from "next/head";
import { GrSync } from "react-icons/gr";

export default function Notes() {
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
      <div className={styles.main_input_box}>
        <div className={styles.main_input_box_div}>
          <textarea placeholder="Take a note..."></textarea>
          <button>Save</button>
        </div>
      </div>
      <div className={styles.notes_box}>
        <textarea
          style={{
            border: "none",
            backgroundColor: "beige",
          }}
        ></textarea>
        <textarea
          style={{
            border: "none",
            backgroundColor: "aliceblue",
          }}
        ></textarea>
        <textarea
          style={{
            border: "none",
            backgroundColor: "wheat",
          }}
        ></textarea>
        <textarea
          style={{
            border: "none",
            backgroundColor: "lavenderblush",
          }}
        ></textarea>
      </div>
    </div>
  );
}
