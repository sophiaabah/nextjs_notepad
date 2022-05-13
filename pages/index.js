import styles from "../styles/notes.module.css";
import Head from "next/head";
import Link from "next/link";
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
  const [userInfo, setUserInfo] = useState({});

  // fetch notes from api
  // if notes arent available fetch from localstorage
  // if they are set user data from api response
  // if there are notes in localstorage send them to db
  // then map notes from db and set into state
  // clear localstorage

  useEffect(() => {
    syncData();
  }, []);

  async function syncData() {
    const notesFromStorage = JSON.parse(localStorage.getItem("notes"));
    const response = await fetch("http://localhost:3000/api/user");
    const user = await response.json();
    console.log(user);

    if (!user && notesFromStorage !== null) {
      setNotes(notesFromStorage); // untested
    }
    if (user) {
      setUserInfo({
        name: user.name,
        id: user.id,
      });
      if (notesFromStorage !== null && notesFromStorage.length) {
        const response = await fetch("http://localhost:3000/api/savenotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            notes: notes,
          }),
        });
      }
    }
    setNotes(user.notes);
    localStorage.removeItem("notes");
  }

  async function newNote() {
    if (value.trim()) {
      var newObj = {
        text: value,
        noteId: nanoid(),
      };
      let clone = [newObj, ...notes];
      setNotes(clone);
      if (!userInfo && !userInfo.name) {
        localStorage.setItem("notes", JSON.stringify(clone));
      }
      const response = await fetch("http://localhost:3000/api/savenotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notes: notes,
        }),
      });
    }
    setValue("");
  }

  function onNoteChange(e) {
    setValue(e.target.value);
  }

  async function onNoteUpdate(e, i) {
    let clone = [...notes];
    clone[i].text = e.target.value;
    setNotes(clone);
    if (!userInfo && !userInfo.name) {
      localStorage.setItem("notes", JSON.stringify(clone));
    }
    const response = await fetch("http://localhost:3000/api/savenotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes: notes,
      }),
    });
  }

  async function onDelete(i) {
    let clone = [...notes];
    clone.splice(i, 1);
    setNotes(clone);
    if (!userInfo && !userInfo.name) {
      localStorage.setItem("notes", JSON.stringify(clone));
    }
    const response = await fetch("http://localhost:3000/api/savenotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes: notes,
      }),
    });
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
          <button className={styles.btn_box_btn1} title="Sync Changes">
            <GrSync />
          </button>
          {userInfo && userInfo.name ? (
            <Link href="/signin">
              <a className={styles.btn_box_btn2}>Log out</a>
            </Link>
          ) : (
            <Link href="/signin">
              <a className={styles.btn_box_btn2}>Sign in</a>
            </Link>
          )}
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

// can i seperate the commands in my block into functions for better readabiltity
// is or the same as and in if statements
// log out functionality, test other users in db, test without signing in?
// should i run my whole async block everytime state changes? is it bad for performance
// how do we test what happens when a user isnt found on the first db request? use my phone?
// some final design refining
// just do more random testing and code reviewing and refining too
// color array
// the search functionality
// i feel weird about sessions. what do we do
