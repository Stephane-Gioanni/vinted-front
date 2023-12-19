"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
import Widthalert from "../Components/Widthalert";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import styles from "./publish.module.css";

export default function Page() {
  const router = useRouter();

  const [token, setToken] = useState(Cookies.get("userToken") || null);
  console.log(token);

  const [windowWidth, setWindowWidth] = useState(1200);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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
        "https://vinted-back-0d6ef682592d.herokuapp.com/offer/publish",
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

  return windowWidth > 1100 ? (
    <div className={styles.publish}>
      <Header></Header>

      {token ? (
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.h1}>Publish an offer</h1>
            <input
              type="text"
              className={styles.input}
              placeholder="Product name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <input
              type="text"
              className={styles.input}
              placeholder="Price"
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
              placeholder="Location"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Color"
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
              Publish
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>
            You must be <Link href="/login">connected</Link>
          </p>
        </div>
      )}
    </div>
  ) : (
    <div>
      <Widthalert></Widthalert>{" "}
    </div>
  );
}
