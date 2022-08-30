import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import FormData from "form-data";

export default function Signup() {
  let fromData = new FormData();
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const LoginPage = () => {
    const loginL = document.getElementById(`${styles.login}`);
    const registerL = document.getElementById(`${styles.register}`);
    const buttonL = document.getElementById(`${styles.btns}`);
    loginL.style.marginLeft = "50px";
    registerL.style.marginLeft = "400px";
    buttonL.style.left = "0px";
    loginL.style.transition = ".5s";
  };


  // เมนู สำหรับ สมัครสมาชิกและส่งข้อมูลไปให้ Back-End บันทึกลง Database 
  const register = async (e) => {
    fromData.append("username", username);
    fromData.append("password", password);
    fromData.append("email", email);

    if (!username) {
      setUsername(null);
    }
    if (!password) {
      setPassword(null);
    }
    if (!email) {
      setEmail(null);
    }

    e.preventDefault();
    const dataSignUp = Object.fromEntries(fromData);
    await axios
      .post("http://localhost:3001/useranimal/register", dataSignUp)
      .then((res) => {
        if (res.status == 200) {
          alert("register Success");
          document.getElementById("formSignup").reset();
          LoginPage();
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(`${err.response.data.message}`);
      });
  };

  return (
    <Fragment>
      <form id="formSignup" className={styles.inputGroud}>
        <input
          type="text"
          name="username"
          className={styles.inputFiled}
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        {username === null ? (
          <span className="error">please enter characters 4-8</span>
        ) : (
          <span></span>
        )}
        <input
          type="password"
          name="password"
          className={styles.inputFiled}
          required
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {password === null ? (
          <span className="error">please enter characters 4-8</span>
        ) : (
          <span></span>
        )}
        <input
          type="email"
          name="email"
          className={styles.inputFiled}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern=".+@globex\.com"
        />
        {email === null ? (
          <span className="error">please enter Email</span>
        ) : (
          <span></span>
        )}
        <div className="mt-4"></div>
        <button onClick={(e) => register(e)} className={styles.btnSubmit}>
          Register
        </button>
      </form>
    </Fragment>
  );
}
