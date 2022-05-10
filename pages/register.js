import Head from "next/head";
import styles from "../styles/forms.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <div className={styles.register_box}>
      <main className="box pa4 black-80">
        <form
          className="measure center"
          // onSubmit={onRegister}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f3 fw5 ph0 mh0">Create an account</legend>
            <div className="mv3">
              <label className="db fw5 lh-copy f5" htmlFor="name">
                {`What's your name?`}
              </label>
              <input
                // onChange={onNameChange}
                className={styles.input}
                // value={name}
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
                // onChange={onEmailChange}
                className={styles.input}
                // value={email}
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
                // onChange={onPasswordChange}
                className={styles.input}
                // value={password}
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <Link href="/">
            <a className={styles.btn}>Sign In</a>
          </Link>
        </form>
      </main>
    </div>
  );
}
