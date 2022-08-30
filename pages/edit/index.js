import React from "react";
import Datapost from "../Datapost";

export default function index() {
  return <Datapost />;
}

export async function getServerSideProps(context) {
    console.log(context);
    return {
      props: { message: `${context}` }, // will be passed to the page component as props
    };
  }