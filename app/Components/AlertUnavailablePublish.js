import styles from "./alert.module.css";
import Link from "next/link";

export default function AlertUnavailablePublish() {
  return (
    <div className={styles.alertUnavailablePublish}>
      <p>
        Sorry this functionnality is not available at the moment.
        <br />
        Please follow this{" "}
        <Link href="/login" className={styles.alertUnavailablePublishLink}>
          link
        </Link>{" "}
        to login or{" "}
        <Link href="/signup" className={styles.alertUnavailablePublishLink}>
          here
        </Link>{" "}
        to sign up.
      </p>
    </div>
  );
}
