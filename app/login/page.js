"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/app/Components/Header";
import Footer from "../Components/Footer";
import Widthalert from "../Components/Widthalert";
import AlertLog from "../Components/AlertLog";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(1200);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [alertReason, setAlertReason] = useState("");
  const [alertLog, setAlertLog] = useState(false);

  console.log(email, password);

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
    if (tokenToSet) {
      Cookies.set("userToken", tokenToSet);
      setToken(tokenToSet);
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://vinted-back-0d6ef682592d.herokuapp.com/user/login",
        formData,
        { headers: { contentType: "multipart/form-data" } }
      );
      if (response.data.token) {
        setUser(response.data.token);
        router.push("/");
      } else {
        setAlertReason(error.response.data.message);
        setAlertLog(true);
      }
    } catch (error) {
      setAlertReason(error.response.data.message);
      setAlertLog(true);
    }
  };

  return windowWidth > 1100 ? (
    <div className={styles.login}>
      <Header setUser={setUser}></Header>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.h1}>Log in</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
          />
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
            Log in
          </button>
          <Link href="/signup">
            <p className={styles.lastSentence}>
              You dont have an account yet? Sign up !
            </p>
          </Link>
        </form>
      </div>
      <Footer></Footer>
    </div>
  ) : (
    <div>
      <Widthalert></Widthalert>
    </div>
  );
}
