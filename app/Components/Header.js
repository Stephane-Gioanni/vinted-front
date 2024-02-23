/* eslint-disable react/no-unescaped-entities */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import Logo from "../Images/logo.png";
import Image from "next/image";
import AlertMainPage from "./AlertMainPage";

export default function Header({ title, setTitle }) {
  const router = useRouter();

  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [alertState, setAlertState] = useState(false);

  const deconnect = () => {
    Cookies.remove("userToken");
    setToken(null);
  };

  return (
    <div className={styles.header}>
      <div>
        <div className="container">
          <div className={styles.headerTop}>
            <Link href="/">
              <Image
                src={Logo}
                alt={Logo}
                className={styles.logo}
                width="80"
                height="30"
              ></Image>
            </Link>
            {token ? (
              <div className={styles.buttons}>
                <button
                  className={styles.disconnect}
                  onClick={(event) =>
                    deconnect(setToken(null), router.push("/"))
                  }
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

        <div className={styles.headerSeparation}></div>
        <div className="container">
          {alertState === true ? (
            <div
              onClick={() => {
                setAlertState(false);
              }}
            >
              <AlertMainPage></AlertMainPage>
            </div>
          ) : (
            <div></div>
          )}
          <div className={styles.headerBottom}>
            <span
              className={styles.headerbottomSection}
              onClick={() => {
                if (alertState === false) {
                  setAlertState(true);
                } else if (alertState === true) {
                  setAlertState(false);
                }
              }}
            >
              Women
            </span>
            <span
              className={styles.headerbottomSection}
              onClick={() => {
                if (alertState === false) {
                  setAlertState(true);
                } else if (alertState === true) {
                  setAlertState(false);
                }
              }}
            >
              Men
            </span>
            <span
              className={styles.headerbottomSection}
              onClick={() => {
                if (alertState === false) {
                  setAlertState(true);
                } else if (alertState === true) {
                  setAlertState(false);
                }
              }}
            >
              Kids
            </span>
            <span
              className={styles.headerbottomSection}
              onClick={() => {
                if (alertState === false) {
                  setAlertState(true);
                } else if (alertState === true) {
                  setAlertState(false);
                }
              }}
            >
              Home
            </span>
            <span
              className={styles.headerbottomSection}
              onClick={() => {
                if (alertState === false) {
                  setAlertState(true);
                } else if (alertState === true) {
                  setAlertState(false);
                }
              }}
            >
              Entertainment
            </span>
            <span
              className={styles.headerbottomSection}
              onClick={() => {
                if (alertState === false) {
                  setAlertState(true);
                } else if (alertState === true) {
                  setAlertState(false);
                }
              }}
            >
              Pet care
            </span>
            <span
              className={styles.headerbottomSection}
              onClick={() => {
                if (alertState === false) {
                  setAlertState(true);
                } else if (alertState === true) {
                  setAlertState(false);
                }
              }}
            >
              About
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
