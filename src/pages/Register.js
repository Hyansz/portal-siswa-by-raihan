import styles from "@/styles/Login.module.css";
import { dmSans } from "@/styles/font";

export default function loginTemplate() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={`${dmSans.className} ${styles.textWhite}`}>
                    Sign Up
                </h1>
                <p className={`${dmSans.className} ${styles.p1}`}>
                    Enter your data to sign up!
                </p>
                <h4 className={`${dmSans.className} ${styles.h4_value}`}>
                    Name*
                </h4>
                <input
                    className={`${dmSans.className} ${styles.inputvalue}`}
                    type="text"
                    email=""
                    required=""
                    placeholder="mail@simmmple.com"
                />
                <h4 className={`${dmSans.className} ${styles.h4_value}`}>
                    Birthday*
                </h4>
                <input
                    className={`${dmSans.className} ${styles.inputvalue}`}
                    type="date"
                    password=""
                    required=""
                    // placeholder="mm/dd/yyyy"
                />
                <h4 className={`${dmSans.className} ${styles.h4_value}`}>
                    Email*
                </h4>
                <input
                    className={`${dmSans.className} ${styles.inputvalue}`}
                    type="text"
                    email=""
                    required=""
                    placeholder="mail@simmmple.com"
                />
                <h4 className={`${dmSans.className} ${styles.h4_value}`}>
                    Password*
                </h4>
                <input
                    className={`${dmSans.className} ${styles.inputvalue}`}
                    type="password"
                    password=""
                    required=""
                    placeholder="******"
                />
            </div>
        </div>
    );
}
