import styles from "../styles/notes.module.css";
import Head from "next/head";

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
          <button>
            <i className="gg-upload-list"></i>
          </button>
          <button>
            <i className="gg-layout-list"></i>
          </button>
          <div>S</div>
        </div>
      </nav>
      <div className={styles.main_input_box}>
        <textarea placeholder="Take a note..."></textarea>
        <button>
          <i className="gg-check-r"></i>
        </button>
      </div>
      <div className={styles.notes_box}>
        <textarea></textarea>
        <textarea></textarea>
        <textarea></textarea>
        <textarea></textarea>
        <textarea></textarea>
        <textarea></textarea>
      </div>
    </div>
  );
}
