/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [DataCat, setDatacat] = useState([]);

  // ดึงข้อมูลจาก API ภายนอก มาแสดงใน Project
  async function getDatecat() {
    const res = await axios
      .get("https://api.thecatapi.com/v1/images/search?limit=100")
      .then((response) => {
        setDatacat(response.data);
      })
      .catch((err) => {
        alert("API NOT FOUND");
        console.log(err)
      });
  }
  useEffect(() => {
    getDatecat();
  }, []);

  return (
    <div className={styles.ImageBackgroudCat}>
      <div
        className="container"
        style={{ overflow: "hidden", height: "100%", position: "relative" }}
      >
        <div
          className="row row-cols-1 row-cols-lg-3 g-4 py-5"
          style={{
            marginTop: "50px",
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "-20px",
            right: "-20px",
            overflowY: "scroll",
          }}
        >
          {DataCat.map((v, index) => {
            if (v) {
              return (
                <div key={index} className="col px-5">
                  <div
                    className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg"
                    style={{ backgroundImage: "url(" + `${v.url}` + ")" }}
                  >
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                      <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold"></h2>
                      <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">
                          <img
                            src={v.url}
                            width="32"
                            height="32"
                            className="rounded-circle border border-white"
                          />
                        </li>
                        <li className="d-flex align-items-center me-3">
                          <small>{v.id}</small>
                        </li>
                        <li className="d-flex align-items-center">
                          <small>{index + 1}</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Fragment>
      <Navbar />
      {page}
    </Fragment>
  );
};
