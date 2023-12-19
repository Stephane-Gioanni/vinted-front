/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/app/Components/Header";
import Widthalert from "@/app/Components/Widthalert";
import Image from "next/image";
import Banniere from "./banniere.png";
import styles from "./offer.module.css";

export default function Offer({ params }) {
  let param = params.slug;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-back-0d6ef682592d.herokuapp.com/offer/${param}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [param]);

  return (
    <div>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div>
          {windowWidth > 1100 ? (
            <div className={styles.main}>
              <Header></Header>
              <div className="container">
                <div className={styles.topMain}>
                  <Image
                    priority={true}
                    src={Banniere}
                    width={950}
                    height={225}
                    alt="banniere-offer"
                  ></Image>
                </div>
                <div className={styles.body}>
                  <div className={styles.bodyLeft}>
                    <img
                      className={styles.image}
                      src={data.product_image.secure_url}
                      alt=""
                    />
                  </div>
                  <div className={styles.bodyRight}>
                    {" "}
                    <div className={styles.bodyRightInfos}>
                      <div className={styles.bodyRightInfosTop}>
                        <span className={styles.price}>
                          {data.product_price} €
                        </span>
                        <div className={styles.product_details}>
                          <div className={styles.product_detailsSection}>
                            {data.product_details.map((elem, index) => {
                              const keys = Object.keys(elem);
                              console.log(keys);

                              return <div key={index}>{keys}</div>;
                            })}
                          </div>
                          <div>
                            {data.product_details.map((elem, index) => {
                              const keys = Object.keys(elem);
                              return <div key={index}>{elem[keys]}</div>;
                            })}
                          </div>
                        </div>
                      </div>
                      <div className={styles.sep}></div>
                      <div className={styles.bodyRightInfosBottom}>
                        <div className={styles.product_infos}>
                          <span className={styles.product_name}>
                            {data.product_name}
                          </span>
                          <span className={styles.product_description}>
                            {data.product_description}
                          </span>
                        </div>
                        <div className={styles.bodyRightButtons}>
                          <button
                            className={styles.button_acheter}
                            onClick={() => {
                              alert(
                                "Sorry, this functionnality is disabled at the moment"
                              );
                            }}
                          >
                            Buy
                          </button>
                          <button
                            className={styles.button}
                            onClick={() => {
                              alert(
                                "Sorry, this functionnality is disabled at the moment"
                              );
                            }}
                          >
                            Made an offer
                          </button>
                          <button
                            className={styles.button}
                            onClick={() => {
                              alert(
                                "Sorry, this functionnality is disabled at the moment"
                              );
                            }}
                          >
                            Message
                          </button>
                          <button
                            className={styles.button}
                            onClick={() => {
                              alert(
                                "Sorry, this functionnality is disabled at the moment"
                              );
                            }}
                          >
                            Favorite
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.bodyRightInfosUser}>
                      <div className={styles.userInfos}>
                        <img
                          className={styles.avatarPicture}
                          src={data.owner.account.avatar.secure_url}
                          alt=""
                        />
                        <span> {data.owner.account.username}</span>
                      </div>
                      <div className={styles.sep}></div>
                      <div className={styles.userContactSection}>
                        <span
                          className={styles.contact}
                          onClick={() => {
                            alert(
                              "Sorry, this functionnality is disabled at the moment"
                            );
                          }}
                        >
                          Contact
                        </span>

                        <span
                          className={styles.follow}
                          onClick={() => {
                            alert(
                              "Sorry, this functionnality is disabled at the moment"
                            );
                          }}
                        >
                          Follow
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Widthalert></Widthalert>
          )}
        </div>
      )}
    </div>
  );
}

/*

export async function generateStaticParams() {
  const data = await fetch("http://localhost:4000/offers").then((res) =>
    res.json()
  );

  return data.offers.map((offer) => ({
    slug: offer._id,
  }));
}

*/

/*
<div className={styles.main}>
          <Header></Header>
          <div className="container">
            <div className={styles.topMain}>
              <Image
                priority={true}
                src={Banniere}
                width={950}
                height={225}
                alt="banniere-offer"
              ></Image>
            </div>
            <div className={styles.body}>
              <div className={styles.bodyLeft}>
                <img
                  className={styles.image}
                  src={data.product_image.secure_url}
                  alt=""
                />
              </div>
              <div className={styles.bodyRight}>
                {" "}
                <div className={styles.bodyRightInfos}>
                  <div className={styles.bodyRightInfosTop}>
                    <span className={styles.price}>{data.product_price} €</span>
                    <div className={styles.product_details}>
                      <div className={styles.product_detailsSection}>
                        {data.product_details.map((elem, index) => {
                          const keys = Object.keys(elem);
                          console.log(keys);
                          return <div key={index}>{keys}</div>;
                        })}
                      </div>
                      <div>
                        {data.product_details.map((elem, index) => {
                          const keys = Object.keys(elem);
                          return <div key={index}>{elem[keys]}</div>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={styles.sep}></div>
                  <div className={styles.bodyRightInfosBottom}>
                    <div className={styles.product_infos}>
                      <span className={styles.product_name}>
                        {data.product_name}
                      </span>
                      <span className={styles.product_description}>
                        {data.product_description}
                      </span>
                    </div>
                    <div className={styles.bodyRightButtons}>
                      <button className={styles.button_acheter}>Acheter</button>
                      <button className={styles.button}>Faire une offre</button>
                      <button className={styles.button}>Message</button>
                      <button className={styles.button}>Favoris</button>
                    </div>
                  </div>
                </div>
                <div className={styles.bodyRightInfosUser}>
                  <div className={styles.userInfos}>
                    <img
                      className={styles.avatarPicture}
                      src={data.owner.account.avatar.secure_url}
                      alt=""
                    />
                    <span> {data.owner.account.username}</span>
                  </div>
                  <div className={styles.sep}></div>
                  <div className={styles.userContactSection}>
                    <span className={styles.contact}>Contacter</span>

                    <span className={styles.follow}>Suivre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
*/
