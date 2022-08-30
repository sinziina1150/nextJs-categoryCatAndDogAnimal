/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Home.module.css";
import {
  faCheckSquare,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function history({ data }) {
  const router = useRouter();
  const getuser = useSelector((state) => state.user);
  useEffect(() => {
    if (getuser.user === null) {
      router.push("/Login");
    }
  }, [getuser, router]);

  if (getuser.user === null) {
    return (
      <Fragment>
        <div className="container" style={{ marginTop: "150px" }}>
          <h1>กรุณา Login</h1>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className={styles.ImageBackground}>
          <div className="container" style={{ marginTop: "150px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">weight</TableCell>
                    <TableCell align="center">heigth</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.animalID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.weight}</TableCell>
                      <TableCell align="center">{row.heigth}</TableCell>
                      <TableCell align="center">
                        <img
                          src={"http://localhost:3001/src/upload/" + row.image}
                          alt=""
                          style={{ width: "100px", heigth: "100px" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="button">
                          <Link href={"/edit/" + row.animalID}>
                            <a className="btn btn-primary">
                              {" "}
                              <FontAwesomeIcon icon={faPen} />
                            </a>
                          </Link>
                          &nbsp; &nbsp; &nbsp;
                          <button
                            style={{ borderRadius: "50%" }}
                            className="btn btn btn-outline-danger"
                            onClick={() => DeletePost(v.animalID)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Fragment>
    );
  }
}

history.getLayout = function getLayout(page) {
  return (
    <Fragment>
      <Navbar />
      {page}
    </Fragment>
  );
};
