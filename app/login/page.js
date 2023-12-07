"use client";

import Header from "@/app/Components/Header";
import styles from "./login.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  console.log(email, password);

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
        "http://localhost:4000/user/login",
        formData,
        { headers: { contentType: "multipart/form-data" } }
      );
      if (response.data.token) {
        setUser(response.data.token);
        router.push("/");
      } else {
        alert(error.response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles.login}>
      <Header setUser={setUser}></Header>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.h1}>Se connecter</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Se connecter
          </button>
          <Link href="/signup">
            <p className={styles.lastSentence}>
              Pas encore de compte? Inscris toi !
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
