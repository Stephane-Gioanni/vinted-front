"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Widthalert from "../Components/Widthalert";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import styles from "./publish.module.css";
import AlertPublished from "../Components/AlertPublished";
import AlertUnavailable from "../Components/AlertUnavailablePublish";
import fblogo from "./Images/fblogo.png";
import googleLogo from "./Images/googleLogo.png";
import appleLogo from "./Images/applelogo.png";
import Image from "next/image";

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
  const [alert, setAlert] = useState(false);
  const [unavailableAlert, setUnavailableAlert] = useState(false);

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
        setAlert(true);
        router.push(`/offer/${response.data._id}`);
      } else {
        alert("une erreur est survenue");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return windowWidth > 1100 ? (
    <div>
      <Header></Header>
      <div className={styles.publish}>
        {token ? (
          <div>
            {alert === true ? (
              <div>
                <AlertPublished
                  onClick={() => {
                    setAlert(false);
                  }}
                ></AlertPublished>
              </div>
            ) : (
              <div></div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formHead}>
                <span className={styles.h1}>Sell your item</span>
              </div>

              <div className={styles.formSections}>
                <div className={styles.section}>
                  <span>Title</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="ex: Green shirt"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className={styles.separation}></div>
                <div className={styles.section}>
                  <span>Describe your item</span>
                  <textarea
                    type="text"
                    className={styles.textArea}
                    placeholder="ex: Worn a few times"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formSections}>
                <div className={styles.section}>
                  <span>Condition</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Condition"
                    value={condition}
                    onChange={(event) => setCondition(event.target.value)}
                  />
                </div>
                <div className={styles.separation}></div>
                <div className={styles.section}>
                  <span>Location</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Location"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
                <div className={styles.separation}></div>
                <div className={styles.section}>
                  <span>Brand</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Brand"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </div>
                <div className={styles.separation}></div>
                <div className={styles.section}>
                  <span>Size</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Size"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                  />
                </div>
                <div className={styles.separation}></div>
                <div className={styles.section}>
                  <span>Color</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Color"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <span>Price</span>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className={styles.section}>
                <span>Upload photo</span>
                <div className={styles.inputFile}>
                  <input
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </div>
              </div>

              <div className={styles.formBottom}>
                {" "}
                <button type="submit" className={styles.uploadButton}>
                  Upload
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className={styles.notConnectedBody}>
            <div className={styles.notConnectedBox}>
              <span className={styles.h1}>
                Join and sell pre-loved clothes with no fees{" "}
              </span>

              {unavailableAlert === false ? (
                <div
                  className={styles.continueWithBox}
                  onClick={() => {
                    setUnavailableAlert(true);
                  }}
                >
                  <Image
                    className={styles.logoConnect}
                    src={fblogo}
                    alt="fbLogo"
                  />
                  <p>Continue with Facebook</p>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setUnavailableAlert(false);
                  }}
                >
                  <AlertUnavailable></AlertUnavailable>
                </div>
              )}

              <div
                className={styles.continueWithBox}
                onClick={() => {
                  setUnavailableAlert(true);
                }}
              >
                <Image
                  className={styles.logoConnect}
                  src={googleLogo}
                  alt="logoGoogle"
                ></Image>
                <p>Continue with Google</p>
              </div>
              <div
                className={styles.continueWithBox}
                onClick={() => {
                  setUnavailableAlert(true);
                }}
              >
                <Image
                  className={styles.logoConnect}
                  src={appleLogo}
                  alt="logoApple"
                ></Image>
                <p>Continue with Apple</p>
              </div>
              <p>
                Already have an account?{" "}
                <Link href="/login" className={styles.link}>
                  Log in
                </Link>
              </p>
              <p>
                Or register with{" "}
                <Link href="/signup" className={styles.link}>
                  Email
                </Link>
              </p>
            </div>
          </div>
        )}
        <Footer></Footer>
      </div>
    </div>
  ) : (
    <div>
      <Widthalert></Widthalert>{" "}
    </div>
  );
}
