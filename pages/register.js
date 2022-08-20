import Head from "next/head";
import styles from "../styles/forms.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function onRegister(e) {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.id) {
      router.push("/");
    }
  }
  return (
    <div className={styles.register_box}>
      <main className="box pa4 black-80">
        <form className="measure center" onSubmit={onRegister}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw2 ph0 mh0">Create an account</legend>
            <div className="mv3">
              <label className="db fw5 lh-copy f5" htmlFor="name">
                {`What's your name?`}
              </label>
              <input
                onChange={onNameChange}
                className={styles.input}
                value={name}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw5 lh-copy f5" htmlFor="email-address">
                Email address
              </label>
              <input
                onChange={onEmailChange}
                className={styles.input}
                value={email}
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw5 lh-copy f5" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className={styles.input}
                value={password}
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <button type="submit" className={styles.btn}>
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
}
