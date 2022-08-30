/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import History from "./history";
import Profile from "./Profile";
import axios from "axios";
import {useSelector} from "react-redux"
import { useRouter } from "next/router";



export async function getServerSideProps(context) {
  const res = await axios.get(
    `http://localhost:3001/animals/history/${context.params.userid}`
  );


  const history = res.data.data;
  return {
    props: {
      data: history,
    },
  };
}

export default History
