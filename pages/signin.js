import Head from "next/head";
import styles from "../styles/forms.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function onSignin(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
    <div className={styles.signin_box}>
      <main className="pa4 black-80">
        <form className="measure center" onSubmit={onSignin}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f3 fw5 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw5 lh-copy f5" htmlFor="email-address">
                Email address
              </label>
              <input
                onChange={onEmailChange}
                className={styles.input}
                type="email"
                name="email-address"
                id="email-address"
                value={email}
              />
            </div>
            <div className="mv3">
              <label className="db fw5 lh-copy f5" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className={styles.input}
                type="password"
                name="password"
                id="password"
                value={password}
              />
            </div>
          </fieldset>
          <div className="">
            <button type="submit" className={styles.btn}>
              Sign In
            </button>
          </div>
          <div className="lh-copy mt3">
            <p>{`Don't have an account?`}</p>
            <Link href="/register">
              <a style={{ textDecoration: "underline" }}>Sign up</a>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
