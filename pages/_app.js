import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {warpper} from '../redux/store'
import { useEffect } from "react";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // นำ Css framework Bootstarp 5 มาใช้ใน Project 
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, [router.events]);

  
  const getLayout = Component.getLayout || ((page) => page);



  return getLayout(
      <Component {...pageProps} />
  );
}

export default warpper.withRedux(MyApp);
