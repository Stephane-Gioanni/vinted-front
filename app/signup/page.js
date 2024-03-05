/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Widthalert from "../Components/Widthalert";
import AlertLog from "../Components/AlertLog";
import Header from "@/app/Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import styles from "./signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState({});
  const [alertReason, setAlertReason] = useState("");
  const [alertLog, setAlertLog] = useState(false);

  const [windowWidth, setWindowWidth] = useState(1200);

  console.log(email, username, password);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const setUser = (tokenToSet) => {
    Cookies.set("userToken", tokenToSet);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && username && password && file) {
        const formData = new FormData();

        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("picture", file);

        const response = await axios.post(
          "https://vinted-back-0d6ef682592d.herokuapp.com/user/signup",
          formData,
          {
            headers: {
              contentType: "multipart/form-data",
            },
          }
        );
        if (response.data.token) {
          setUser(response.data.token);
          router.push("/");
        } else {
          setAlertReason("Une erreur est survenue");
          setAlertLog(true);
        }
      } else {
        setAlertReason("Missing parameters.");
        setAlertLog(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return windowWidth > 1100 ? (
    <div className={styles.signup}>
      <Header></Header>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.h1}>Sign in</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            className={styles.input}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <div className={styles.inputFile}>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          {alertLog === true ? (
            <div
              onClick={() => {
                setAlertLog(false);
              }}
            >
              <AlertLog alertReason={alertReason}></AlertLog>
            </div>
          ) : (
            <div></div>
          )}
          <button type="submit" className={styles.button}>
            Create an account
          </button>
          <Link href="/login">
            <p className={styles.lastSentence}>
              Already have an account? Log in !
            </p>
          </Link>
        </form>
      </div>
      <Footer></Footer>
    </div>
  ) : (
    <Widthalert></Widthalert>
  );
}
