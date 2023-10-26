import styles from "@/styles/Login.module.css";
import { dmSans } from "@/styles/font";

export default function loginTemplate() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={`${dmSans.className} ${styles.textWhite}`}>
                    Sign In
                </h1>
                <p className={`${dmSans.className} ${styles.p1}`}>
                    Enter your email and password to sign in!
                </p>
                <h4 className={`${dmSans.className} ${styles.h4_value}`}>
                    Email
                    <span>*</span>
                </h4>
                <input
                    className={`${dmSans.className} ${styles.inputvalue}`}
                    type="text"
                    email=""
                    required=""
                    placeholder="mail@simmmple.com"
                />
                <h4 className={`${dmSans.className} ${styles.h4_value}`}>
                    Password
                    <span>*</span>
                </h4>
                <input
                    className={`${dmSans.className} ${styles.inputvalue}`}
                    type="password"
                    required=""
                    placeholder="******"
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>
                        <input
                            className={`${dmSans.className}`}
                            type="checkbox"
                            required=""
                            />
                        <h4 className={`${dmSans.className} ${styles.h4_check}`}>
                            Keep me logged in
                        </h4>
                    </div>
                    <h4 className={`${dmSans.className} ${styles.h4_check}`}>
                        forgot password
                    </h4>
                </div>
                <input
                    className={`${dmSans.className} ${styles.inputsubmit}`}
                    type="submit"
                    required=""
                />
            </div>
        </div>
    );
}
