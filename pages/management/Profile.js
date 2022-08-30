/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import FormData from "form-data";
import Navbar from "../../components/Navbar";
import {
  faCheckSquare,
  faPen,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function Profile({ data }) {

  // ตัวแปล ต่างที่ใช้ใน component Profile
  const [updatedata, setUpdatedata] = useState(data);
  const [image, setImage] = useState(null);
  const [ImageURL, setImageURL] = useState(null);

  const dispatch = useDispatch();

  const formData = new FormData();

  // ฟังชั่น สำหรับนำข้อมูลมาอัพเดท 
  const update = (e) => {
    const { name, value } = e.target;
    setUpdatedata({ ...updatedata, [name]: value });
  };


  // ฟังชั่นสำหรับ เลือกรูป
  const onFileChange = (e) => {
    // เช็คว่ามี file เข้ามาหรือไม่ 
    if (e.target.files.length == 0) {
      // ถ้าไม่มีให้ set ค่า image เป็น Null
      setImage(null);
      setImageURL(null);
    } else {
      // ถ้ามีก็นำมา เช็ค Type file ว่าเป็นรูปหรือไม่
      if (
        (e.target.files[0].type === "image/jpeg") |
        (e.target.files[0].type === "image/png") |
        (e.target.files[0].type === "image/jpg")
      ) {
        //ถ้าเป็นให้มีการ set รูปภาพสำหรับ perview 
        const file = e.target.files[0];
        let images = URL.createObjectURL(file);
        setImageURL(images);
        console.log(file);
        setImage(file);
      } else {
        // ถ้าไม่ใช่ให้ alert เพื่อหาไฟล์ที่ถูกต้อง
        alert("กรุณาใช้ไฟล์รูป");
        setImage(null);
      }
    }
  };
// ฟังชั่น สำหรับแก้ไข ข้อมูล
  const updateProfile = async (e) => {
    e.preventDefault();
    formData.append("username", updatedata.username);
    formData.append("password", updatedata.password);
    formData.append("email", updatedata.email);
    formData.append("image", image);
    await axios
      .put(`http://localhost:3001/useranimal/editUser/${data.userID}`, formData)
      .then((res) => {
        if (res.status == 200) {
          alert("Edit Data Success");
        }else{
          alert("Error Edit Data")
        }
      }).catch((err) => {
        alert("Error Edit Data")
        console.log(err)
      });
  };

  return (
    <Fragment>
      <div className="container-fluid" style={{backgroundSize:"auto" ,height:"100vh"}}>
        <div ></div>
        <div className="container"  style={{padding:"100px 0 0 0 "}}> 
          <form className="col-lg-12" style={{postion:"absolute"}}>
            <div className="row">
              <div className={styles.TextLabel}>
                <h1>
                  <FontAwesomeIcon icon={faIdCard} />
                  &nbsp; ProFile
                </h1>
              </div>
              <div className="col-lg-6">
                {data.image === null ? (
                  <img
                    src={"/image/1200px-Picture_icon_BLACK.svg.png"}
                    style={{
                      width: "500px",
                      display:"flex",
                      alignItems:"center",
                      maxHeight: "365px",
                      borderRadius: "20px",
                      overflow:"hidden"
                    }}
                    alt=""
                    className="card-cover col-sm-6"
                  />
                ) : ImageURL ? (
                  <img
                    src={ImageURL}
                    style={{
                      width: "500px",
                      display:"flex",
                      alignItems:"center",
                      height: "365px",
                      borderRadius: "20px",
                      overflow:"hidden"
                    }}
                    className="card-cover col-sm-6"
                    alt=""
                  />
                ) : (
                  <img
                    src={"http://localhost:3001/src/imageUser/" + data.image}
                    style={{
                      width: "500px",
                      display:"flex",
                      alignItems:"center",
                      height: "365px",
                      overflow:"hidden",
                      borderRadius: "20px",
                    }}
                    className="card-cover col-sm-6"
                    alt=""
                  />
                )}
                <input
                  type="file"
                  name="file"
                  id=""
                  className="form-control mt-3"
                  onChange={(e) => onFileChange(e)}
                />
              </div>
              <div className="col-lg-6">
                <div className="input-username mt-3">
                  <label className={styles.TextLabel}>Username :</label>
                  <input
                    type="text"
                    name="username"
                    readOnly
                    className="form-control"
                    value={updatedata.username}
                    onChange={(e) => update(e)}
                  />
                     <label className={styles.TextLabel}>Password : </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={updatedata.password}
                    onChange={(e) => update(e)}
                  />
                </div>
                   <div className="input-email mt-3">
                  <label className={styles.TextLabel}>Email :</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={updatedata.email}
                    onChange={(e) => update(e)}
                  />
                </div>
                </div>
              </div>
              <div className="col-lg-6">
             
              </div>
              <div className="col-lg-6">
              <div className="input-password mt-1">
               
              </div>
              <div className="col-sm-6 ">
                <div className="submit d-flex justify-content-center w-100 mt-3">
                  <button
                    type="submit"
                    className="btn btn-success w-50"
                    onClick={(e) => updateProfile(e)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

Profile.getLayout = function getLayout(page) {
  return (
    <Fragment>
      <Navbar />
      {page}
    </Fragment>
  );
};
