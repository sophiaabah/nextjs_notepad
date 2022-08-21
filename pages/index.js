import styles from "../styles/notes.module.css";
import Head from "next/head";
import Link from "next/link";
import { GrSync } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { nanoid } from "nanoid";
import { useState, useMemo, useEffect } from "react";

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

export default function Notes() {
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [searchValue, setSearchValue] = useState("");

  // usememo returns a value
  const filteredNotes = useMemo(() => {
    if (searchValue === "") {
      return notes;
    }
    return notes.filter((item) => item.text.includes(searchValue));
  }, [searchValue, notes]);

  useEffect(() => {
    syncData();
  }, []);

  async function syncData() {
    let userData;
    let userDataResponse;
    const localStorageNotes = JSON.parse(localStorage.getItem("notes"));
    try {
      userDataResponse = await fetch("/api/user"); //error claims my fetch produces html not real json???
      userData = await userDataResponse.json();
    } catch (error) {
      console.log("oops", error, userData);
    }

    if (!userData && localStorageNotes !== null) {
      setNotes(localStorageNotes); // untested
    }
    if (userData) {
      setNotes(userData.notes);
      setUserInfo({
        name: userData.name,
        id: userData.id,
      });
      if (localStorageNotes !== null && localStorageNotes.length) {
        await saveNotes(localStorageNotes);
        localStorage.removeItem("notes");
      }
    }
  }

  async function saveNotes(notes) {
    const saveNotesResponse = await fetch("/api/savenotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes,
      }),
    });
    const savedNotes = await saveNotesResponse.json();
    setNotes(savedNotes);
  }

  async function newNote() {
    if (value.trim()) {
      var newObj = {
        text: value,
        noteId: nanoid(),
      };

      let clone = [newObj, ...notes];
      setNotes(clone);

      if (userInfo && userInfo.name) {
        await saveNotes(clone);
      } else {
        localStorage.setItem("notes", JSON.stringify(clone));
      }
    }
    setValue("");
  }

  const debouncedFunction = debounce(async function onNoteUpdate(e, noteId) {
    let clone = [...notes];
    let i = clone.findIndex((item) => item.noteId === noteId);
    clone[i].text = e.target.value;
    setNotes(clone);

    if (userInfo && userInfo.name) {
      await saveNotes(clone);
    } else {
      localStorage.setItem("notes", JSON.stringify(clone));
    }
  }, 5000);

  // async function onNoteUpdate(e, noteId) {
  //   let clone = [...notes];
  //   let i = clone.findIndex((item) => item.noteId === noteId);
  //   clone[i].text = e.target.value;
  //   setNotes(clone);

  //   if (userInfo && userInfo.name) {
  //     await saveNotes(clone);
  //   } else {
  //     localStorage.setItem("notes", JSON.stringify(clone));
  //   }
  // }

  async function onDelete(noteId) {
    let clone = [...notes];
    let i = clone.findIndex((item) => item.noteId === noteId);
    clone.splice(i, 1);
    setNotes(clone);

    if (userInfo && userInfo.name) {
      const deleteNotesResponse = await fetch("/api/deletenote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteId: noteId,
        }),
      });
      const isDeleted = await deleteNotesResponse.json();
    } else {
      localStorage.setItem("notes", JSON.stringify(clone));
    }
  }

  function onSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function onNoteChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.app_box}>
      <Head>
        <title>My notes</title>
      </Head>
      <nav className={styles.nav_box}>
        <p>keeper.</p>
        <input
          onChange={onSearchChange}
          placeholder="Search"
          value={searchValue}
        />
        <div className={styles.btn_box}>
          <button className={styles.btn_box_btn1} title="Sync Changes">
            <GrSync />
          </button>
          {userInfo && userInfo.name ? (
            <Link href="/api/logout">
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
        {filteredNotes.map((item, i) => {
          return (
            <div
              className={styles.notes_box_div}
              style={{ backgroundColor: colorArr[i] }}
              key={item.noteId}
            >
              <textarea
                style={{ backgroundColor: colorArr[i] }}
                onChange={(e) => onNoteUpdate(e, item.noteId)}
                value={item.text}
              ></textarea>
              <button
                className="four"
                onClick={() => onDelete(item.noteId)}
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
