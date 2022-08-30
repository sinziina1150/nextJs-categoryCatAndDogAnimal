import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Logins } from "../redux/actions/useAction";
import FormData from "form-data";
import styles from "../styles/Home.module.css";
import Signup from "./Signup";

export default function Login() {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [updatedata, setUpdatedata] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();

// ฟังชั่นสำหรับ ใช้ Javascript Dom ในการเปลี่ยนแปลง Css
  const register = () => {
    const loginR = document.getElementById(`${styles.login}`);
    const registerR = document.getElementById(`${styles.register}`);
    const buttonR = document.getElementById(`${styles.btns}`);
    loginR.style.marginLeft = "-450px";
    registerR.style.marginLeft = "50px";
    buttonR.style.left = "120px";
    registerR.style.transition = ".5s";
  };
// ฟังชั่นสำหรับ ใช้ Javascript Dom ในการเปลี่ยนแปลง Css
  const LoginPage = () => {
    const loginL = document.getElementById(`${styles.login}`);
    const registerL = document.getElementById(`${styles.register}`);
    const buttonL = document.getElementById(`${styles.btns}`);
    loginL.style.marginLeft = "50px";
    registerL.style.marginLeft = "400px";
    buttonL.style.left = "0px";
    loginL.style.transition = ".5s";
  };

  // ฟังชั่น หรับการ Login เข้าสู่ระบบ
  const Signin = async (e) => {
    const formdatas = new FormData();
    e.preventDefault();
    if (username.length <= 0) {
      setUsername(null);
    }
    if (password.length <= 0) {
      setPassword(null);
    }
    formdatas.append("username", username);
    formdatas.append("password", password);
    // เปลี่ยน From Data  ให้เป็น Object 
    const data = Object.fromEntries(formdatas);
    await axios
      .post("http://localhost:3001/useranimal/login", data)
      .then((res) => {
        // เมื่อมีการ login สำเร็ส จะมีการ set redux ผ่าน Dispatch
        alert("is correct");
        dispatch(Logins(res.data));
      })
      .catch((error) => {
        alert("username or password is wrong");
      });
  };

  if (user.user === null) {
    return (
      <Fragment>
        <div className={styles.ImageBackground}>
          <div className={styles.FormBox}>
            <div className={styles.button}>
              <div id={styles.btns}></div>
              <button className={styles.toggle} onClick={() => LoginPage()}>
                Login
              </button>
              <button className={styles.toggle} onClick={() => register()}>
                Register
              </button>
            </div>
            <div id={styles.login}>
              <form className={styles.inputGroud}>
                <input
                  type="text"
                  name="username"
                  className={styles.inputFiled}
                  required
                  placeholder="username"
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
                <div className="mt-4"></div>
                <button onClick={(e) => Signin(e)} className={styles.btnSubmit}>
                  Login
                </button>
              </form>
            </div>
            <div id={styles.register}>
              <Signup />
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    router.push("/");
  }
}
