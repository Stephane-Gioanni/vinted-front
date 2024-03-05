import styles from "./alert.module.css";

export default function AlertLog({ alertReason }) {
  return (
    <div className={styles.alertPublished}>
      <p> {alertReason} </p>
    </div>
  );
}
