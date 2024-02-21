/* eslint-disable react/no-unescaped-entities */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import Logo from "../Images/logo.png";
import Image from "next/image";

export default function HeaderMainPage({ title, setTitle }) {
  const router = useRouter();

  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const deconnect = () => {
    Cookies.remove("userToken");
    setToken(null);
  };

  return (
    <div className="container">
      <div className={styles.header}>
        <Link href="/">
          <Image
            src={Logo}
            alt={Logo}
            className={styles.logo}
            width="100"
          ></Image>
        </Link>

        <input
          type="placeholder"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={styles.searchBar}
          placeholder="Search for items?"
        />

        {token ? (
          <div className={styles.buttons}>
            <button
              className={styles.disconnect}
              onClick={(event) => deconnect(setToken(null))}
            >
              Disconnect
            </button>
            <Link href="/publish">
              <button className={styles.sell_button}>Sell now</button>
            </Link>
          </div>
        ) : (
          <div className={styles.buttons}>
            <Link href="/signup">
              <button className={styles.auth_button}>Sign up</button>
            </Link>
            <Link href="/login">
              <button className={styles.auth_button}>Log in</button>
            </Link>
            <Link href="/publish">
              <button className={styles.sell_button}>Sell now</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
