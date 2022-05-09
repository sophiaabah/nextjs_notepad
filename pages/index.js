import styles from "../styles/notes.module.css";
import Head from "next/head";
import { GrSync } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useEffect } from "react";

export default function Notes() {
  const colorArr = [
    "aliceblue",
    "beige",
    "mistyrose",
    "honeydew",
    "lavenderblush",
    "powderblue",
    "ghostwhite",
    "wheat",
    "aliceblue",
    "beige",
    "mistyrose",
    "honeydew",
    "lavenderblush",
    "powderblue",
    "ghostwhite",
    "wheat",
  ];
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesFromStorage = JSON.parse(localStorage.getItem("notes"));
    if (notesFromStorage !== null) {
      setNotes(notesFromStorage);
    }
  }, []);

  function newNote() {
    if (value.trim()) {
      var newObj = {
        text: value,
        id: nanoid(),
      };
      let clone = [newObj, ...notes];
      setNotes(clone);
      localStorage.setItem("notes", JSON.stringify(clone));
    }
    setValue("");
  }

  function onNoteChange(e) {
    setValue(e.target.value);
  }

  function onNoteUpdate(e, i) {
    let clone = [...notes];
    clone[i].text = e.target.value;
    setNotes(clone);
    localStorage.setItem("notes", JSON.stringify(clone));
  }

  function onDelete(i) {
    let clone = [...notes];
    clone.splice(i, 1);
    setNotes(clone);
    localStorage.setItem("notes", JSON.stringify(clone));
  }

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
          <textarea
            onChange={onNoteChange}
            placeholder="Take a note..."
            value={value}
          ></textarea>
          <button onClick={newNote} title="Add a new note">
            Save
          </button>
        </div>
      </div>
      <div className={styles.notes_box}>
        {notes.map((item, i) => {
          return (
            <div
              className={styles.notes_box_div}
              style={{ backgroundColor: colorArr[i] }}
              key={item.id}
            >
              <textarea
                style={{ backgroundColor: colorArr[i] }}
                onChange={(e) => onNoteUpdate(e, i)}
                value={item.text}
              ></textarea>
              <button
                className="four"
                onClick={() => onDelete(i)}
                title="Remove note"
              >
                <TiDelete style={{ fontSize: "1.2rem" }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
