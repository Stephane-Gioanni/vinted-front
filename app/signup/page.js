/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import Header from "@/app/Components/Header";
import styles from "./signup.module.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(email, username, password);

  const router = useRouter();

  const setUser = (tokenToSet) => {
    Cookies.set("userToken", tokenToSet);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && username && password) {
        const formData = new FormData();

        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);

        const response = await axios.post(
          "http://localhost:4000/user/signup",
          formData,
          {
            headers: {
              contentType: "multipart/form-data",
            },
          }
        );
        if (response.data.token) {
          alert("created");
          setUser(response.data.token);
          router.push("/");
        } else {
          alert("une erreur est survenue");
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles.signup}>
      <Header></Header>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.h1}>S'inscrire</h1>

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
            placeholder="password"
            className={styles.input}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit" className={styles.button}>
            Créer un compte
          </button>
          <Link href="/login">
            <p className={styles.lastSentence}>
              Tu as déjà un compte? Connecte toi!
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
