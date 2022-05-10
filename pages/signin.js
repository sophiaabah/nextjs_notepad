import Head from "next/head";
import styles from "../styles/forms.module.css";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className={styles.signin_box}>
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f3 fw5 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw5 lh-copy f5" htmlFor="email-address">
                Email address
              </label>
              <input
                // onChange={onEmailSubmit}
                className={styles.input}
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
                // onChange={onPasswordSubmit}
                className={styles.input}
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <Link href="/">
              <a className={styles.btn}>Sign In</a>
            </Link>
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
