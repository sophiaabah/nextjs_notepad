import styles from "../styles/notes.module.css";
import { IoMdAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function NoteBody(props) {
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

  function newNote() {
    if (value.trim()) {
      var newObj = {
        text: value,
        id: nanoid(),
      };
      setNotes((prev) => [newObj, ...prev]);
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
  }

  function onDelete(i) {
    let copy = [...notes];
    copy.splice(i, 1);
    setNotes(copy);
  }

  return (
    <>
      <div className={styles.main_input_box}>
        <div className={styles.main_input_box_div}>
          <textarea
            onChange={onNoteChange}
            placeholder="Take a note..."
            value={value}
          ></textarea>
          <button onClick={newNote} title="Add a new note">
            <IoMdAdd style={{ fontSize: "1.2rem" }} />
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
    </>
  );
}
