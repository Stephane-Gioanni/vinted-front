import styles from "./alert.module.css";

export default function AlertUnavailable() {
  return (
    <div className={styles.alert}>
      <p>Sorry this functionnality is not available at the moment</p>
    </div>
  );
}
