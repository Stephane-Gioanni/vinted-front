import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footerContained}>
          <p>Made by Stephane G for training purpose only</p>
          <p>2024</p>
          <Link
            className={styles.portfolioLink}
            href="https://hellofromsg.vercel.app/"
          >
            <p>Click here to see my others project on my porfolio</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
