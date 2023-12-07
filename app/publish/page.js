"use client";

import Header from "../Components/Header";
import { useRouter } from "next/navigation";

import styles from "./publish.module.css";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [token, setToken] = useState(Cookies.get("userToken") || null);
  console.log(token);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/offer/publish",
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            contentType: "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data._id) {
        alert("Annonce publiée");
        router.push(`/offer/${response.data._id}`);
      } else {
        alert("une erreur est survenue");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.publish}>
      <Header></Header>

      {token ? (
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.h1}>Publier un article</h1>
            <input
              type="text"
              className={styles.input}
              placeholder="Nom du produit"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <input
              type="text"
              className={styles.input}
              placeholder="Prix"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Condition"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Emplacement"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Marque"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Taille"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Couleur"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
            <div className={styles.inputFile}>
              <input
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div>
            <button type="submit" className={styles.button}>
              Publier
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>
            Vous devez vous <Link href="/login">connecter</Link>
          </p>
        </div>
      )}
    </div>
  );
}
