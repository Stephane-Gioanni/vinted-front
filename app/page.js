/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./page.module.css";
import Header from "@/app/Components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import banniere from "./Images/banniere.jpg";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState(null || "price-asc" || "price-desc");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [priceBox, setPriceBox] = useState("off");
  const [priceFilteredByBox, setPriceFilteredByBox] = useState("off");
  const [resultsPerPageBox, setResultsPerPageBox] = useState("off");
  console.log(priceFilteredByBox);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/offers?title=${title}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}&page=${page}&limit=${limit}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [title, priceMin, priceMax, sort, page, limit]);

  return (
    <main>
      <Header title={title} setTitle={setTitle}></Header>

      {isLoading ? (
        <p>chargement</p>
      ) : (
        <div>
          <Image
            priority={true}
            src={banniere}
            alt={banniere}
            className={styles.banniere}
          ></Image>
          <div className="container">
            <div className={styles.filters}>
              <div className={styles.priceSection}>
                <div
                  className={styles.filterBox}
                  onClick={() => {
                    if (priceBox === "on") {
                      setPriceBox("off");
                    } else if (priceBox === "off") {
                      setPriceBox("on");
                    }
                  }}
                >
                  <span>Prix</span>
                </div>
                <div>
                  {priceBox === "on" ? (
                    <div className={styles.priceFilters}>
                      <div className={styles.priceFiltersBox}>
                        <span>De</span>
                        <input
                          type="text"
                          placeholder="EUR"
                          value={priceMin}
                          onChange={(event) => setPriceMin(event.target.value)}
                        />
                      </div>
                      <div className={styles.priceFiltersBox}>
                        <span>À</span>
                        <input
                          type="text"
                          placeholder="EUR"
                          value={priceMax}
                          onChange={(event) => setPriceMax(event.target.value)}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={styles.priceFilteredBy}>
                <div
                  className={styles.filterBox}
                  onClick={() => {
                    if (priceFilteredByBox === "off") {
                      setPriceFilteredByBox("on");
                    } else if (priceFilteredByBox === "on") {
                      setPriceFilteredByBox("off");
                    }
                  }}
                >
                  <span>Trier par</span>
                </div>

                {priceFilteredByBox === "on" ? (
                  <div className={styles.priceFilteredByBox}>
                    <div className={styles.priceFilteredByBoxChoice}>
                      <span>Prix croissant</span>
                      {sort === "price-desc" ? (
                        <button
                          className={styles.checkedButton}
                          onClick={() => {
                            setSort("price-asc");
                          }}
                        ></button>
                      ) : (
                        <button className={styles.checkedButton}>
                          <div className={styles.checkedButtonCenter}></div>
                        </button>
                      )}
                    </div>
                    <div className={styles.priceFilteredByBoxChoice}>
                      <span>Prix décroissant</span>
                      {sort === "price-asc" ? (
                        <button
                          className={styles.checkedButton}
                          onClick={() => setSort("price-desc")}
                        ></button>
                      ) : (
                        <button className={styles.checkedButton}>
                          <div className={styles.checkedButtonCenter}></div>
                        </button>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div>
                <div className={styles.resultsPerPageSection}>
                  <span
                    onClick={() => {
                      if (resultsPerPageBox === "off") {
                        setResultsPerPageBox("on");
                      } else if (resultsPerPageBox === "on") {
                        setResultsPerPageBox("off");
                      }
                    }}
                  >
                    Nombre de résultats par page
                  </span>
                </div>
                <div>
                  {resultsPerPageBox === "on" ? (
                    <div className={styles.resultsPerPageBox}>
                      {limit === 6 ? (
                        <div className={styles.resultsPerPageBoxLine}>
                          <span onClick={() => setLimit(6)}>6</span>

                          <button className={styles.checkedButton}>
                            <div className={styles.checkedButtonCenter}></div>
                          </button>
                        </div>
                      ) : (
                        <div className={styles.resultsPerPageBoxLine}>
                          <span>6</span>

                          <button
                            className={styles.checkedButton}
                            onClick={() => setLimit(6)}
                          ></button>
                        </div>
                      )}
                      {limit === 12 ? (
                        <div className={styles.resultsPerPageBoxLine}>
                          <span>12</span>

                          <button className={styles.checkedButton}>
                            <div className={styles.checkedButtonCenter}></div>
                          </button>
                        </div>
                      ) : (
                        <div className={styles.resultsPerPageBoxLine}>
                          <span>12</span>

                          <button
                            className={styles.checkedButton}
                            onClick={() => setLimit(12)}
                          ></button>
                        </div>
                      )}
                      {limit === 100 ? (
                        <div className={styles.resultsPerPageBoxLine}>
                          <span>100</span>

                          <button className={styles.checkedButton}>
                            <div className={styles.checkedButtonCenter}></div>
                          </button>
                        </div>
                      ) : (
                        <div className={styles.resultsPerPageBoxLine}>
                          <span>100</span>

                          <button
                            className={styles.checkedButton}
                            onClick={() => setLimit(100)}
                          ></button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={styles.offersCentre}>
              <div className={styles.offers}>
                {data.offers.map((offer) => {
                  return (
                    <Link
                      key={offer._id}
                      href={`/offer/${offer._id}`}
                      className="link"
                    >
                      <div className={styles.offer}>
                        <div className={styles.offerBoxTop}>
                          <img
                            className={styles.avatarUser}
                            src={offer.owner.account.avatar.secure_url}
                            alt=""
                          />
                          <span>{offer.owner.account.username}</span>
                        </div>
                        <img
                          className={styles.offer_img}
                          src={offer.product_image.secure_url}
                          alt=""
                        />
                        <div className={styles.offer_infos}>
                          <span className={styles.price}>
                            {offer.product_price} €
                          </span>
                          <div>
                            {offer.product_details.map((elem, index) => {
                              const key = Object.keys(elem);
                              console.log(index[key], elem[key]);
                              if (index === 2) {
                                return (
                                  <div className={styles.brand} key={index}>
                                    {elem[key]}
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <div>
                            {offer.product_details.map((elem, index) => {
                              const key = Object.keys(elem);
                              console.log(index[key], elem[key]);
                              if (index === 3) {
                                return (
                                  <div className={styles.brand} key={index}>
                                    {elem[key]}
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.pagination}>
              <button
                className={styles.paginationButtons}
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                ‹
              </button>

              <span className={styles.page}>{page}</span>
              <button
                className={styles.paginationButtons}
                onClick={() => {
                  console.log(data);
                  if (data.count > limit * page) {
                    setPage(page + 1);
                  }
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
