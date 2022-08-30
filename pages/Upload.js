/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, Fragment } from "react";
import FormData from "form-data";
import axios from "axios";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Home.module.css";
import {
  faCheckSquare,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Upload() {
  const [name, setName] = useState([]);
  const [weight, setWeight] = useState([]);
  const [heigth, setHeigth] = useState([]);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState(null);
  const router = useRouter();
  let formdata = new FormData();
  const getuser = useSelector((state) => state.user);
  const [datapost, setDatapost] = useState([]);
  const [username, setUserName] = useState(getuser);

  // Select รูปภาพ
  const onFileChange = (e) => {
    if (e.target.files.length === 0) {
      setImage(null);
      console.log(e.target.files);
    } else {
      if (
        (e.target.files[0].type === "image/jpeg") |
        (e.target.files[0].type === "image/png") |
        (e.target.files[0].type === "image/jpg")
      ) {
        const file = e.target.files[0];
        let images = URL.createObjectURL(file);
        setImageURL(images);
        setImage(file);
        console.log(image);
      } else {
        alert("กรุณาใช้ไฟล์รูป");
        setImage(null);
      }
    }
  };
  // Reset From
  const fromreset = () => {
    document.getElementById("postData").reset();
  };

  // ดึงข้อมูลรูปทั้งหมด
  const getDataPost = async () => {
    await axios
      .get("http://localhost:3001/animals/getallanimal")
      .then((response) => {
        setDatapost(response.data);
      });
  };
  useEffect(() => {
    getDataPost();
  }, []);

  const date = new Date();

  const handleclickPostData = async (e) => {
    e.preventDefault();
    let userPost = username.user.userID;
    formdata.append("name", name);
    formdata.append("weight", weight);
    formdata.append("heigth", heigth);
    formdata.append("image", image);
    formdata.append("userID", userPost);
    if (!name) {
      setName(null);
    }
    if (!weight) {
      setWeight(null);
    }
    if (!heigth) {
      setHeigth(null);
    }
    try {
      await axios
        .post(`http://localhost:3001/animals/upload`, formdata)
        .then((response) => {
          if (response.status == 200) {
            fromreset();
            getDataPost();
            setImage(null);
          }
        });
    } catch (error) {
      alert("กรุณากรอกข้อมูล")
    }
  };

  return (
    <Fragment>
      <div  className={styles.ImageBackgroudUpload}>
        {getuser.user === null ? (
            <div
              className="container"
              style={{
                height:"100vh"
              }}
            >
              <div
                className="row row-cols-1 row-cols-lg-3 g-4 py-5"
                style={{
                  marginTop: "50px",
                }}
              >
                {datapost.map((v, index) => {
                  return (
                    <div key={index} className="col">
                      <div
                        className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg"
                        style={{
                          backgroundImage:
                            "url(http://localhost:3001/src/upload/" +
                            `${v.image}` +
                            ")",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "50",
                          }}
                        >
                          <div></div>
                        </div>
                        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                          <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                            {v.name}
                          </h2>
                          <ul className="d-flex list-unstyled mt-auto">
                            <li className="me-auto">
                              <Image
                                src={
                                  "http://localhost:3001/src/upload/" + v.image
                                }
                                width="32"
                                height="32"
                                className="rounded-circle border border-white"
                              />
                            </li>
                            <li className="d-flex align-items-center me-3">
                              <small>{v.id}</small>
                            </li>
                            <li className="d-flex align-items-center">
                              <small>{v.create_time}</small>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        ) : (
          <div>
            <div
              className="container"
              style={{ marginTop: "70px", padding: "30px" }}
            >
              <form id="postData">
                <div className="row">
                  <div className="col-lg-6">
                    <label>Name :</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="mt-2 w-100 d-flex justify-content-center">
                      {name == null ? (
                        <span className="error">
                          Please enter characters 4-8
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <label>weight :</label>
                    <input
                      type="number"
                      name="weight"
                      className="form-control"
                      maxLength={20}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                    <div className="mt-2 w-100 d-flex justify-content-center">
                      {weight == null ? (
                        <span className="error">
                          Please enter characters 4-8
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mt-2">
                    <label>heigth :</label>
                    <input
                      type="number"
                      name="heigth"
                      maxLength={10}
                      className="form-control"
                      onChange={(e) => setHeigth(e.target.value)}
                      required
                    />
                    <div className="mt-2 w-100 d-flex justify-content-center">
                      {heigth == null ? (
                        <span className="error">
                          Please enter characters 4-8
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mt-2">
                    <label>Image :</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={onFileChange}
                      required
                    />
                    <div className="mt-2 w-100 d-flex justify-content-center">
                      {image == null ? (
                        <span className="error">
                          Please enter File image or png
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mt-2">
                    <div
                      className="card card-cover overflow-hidden rounded-4 shadow-lg mb-5"
                      style={{
                        width: "100%",
                      }}
                    >
                      {image == null ? (
                        <img
                          src={"/image/1200px-Picture_icon_BLACK.svg.png"}
                          alt=""
                          weight={250}
                          height={350}
                          layout="fill"
                        />
                      ) : (
                        <img src={imageURL} alt="" height={350} />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mt-4">
                 
                      <button
                        className="btn btn-primary"
                        onClick={handleclickPostData}
                      >
                        PostData
                      </button>
                   
                  </div>
                  <div className="border-bottom mt-3"></div>
                </div>
              </form>
              {/* DataPost */}
              <div className="row row-cols-1 row-cols-lg-3 g-4 py-5">
                {datapost.map((v, index) => {
                  return (
                    <div key={index} className="col">
                      <div
                        className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg"
                        style={{
                          backgroundImage:
                            "url(http://localhost:3001/src/upload/" +
                            `${v.image}` +
                            ")",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "50",
                          }}
                        >
                          <div></div>
                        </div>
                        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                          <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                            {v.name}
                          </h2>
                          <ul className="d-flex list-unstyled mt-auto">
                            <li className="me-auto">
                              <Image
                                src={
                                  "http://localhost:3001/src/upload/" + v.image
                                }
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
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

Upload.getLayout = function getLayout(page) {
  return (
    <Fragment>
      <Navbar />
      {page}
    </Fragment>
  );
};
