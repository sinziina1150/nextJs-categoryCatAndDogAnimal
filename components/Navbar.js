/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Logins } from "../redux/actions/useAction";
import { useRouter } from "next/router";
import Image from "next/image";
export default function Navbar() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(user.user);


  // ฟังชั่นสำหรับ ออกจากระบบ
  const Signout = (e) => {
    /** เมื่อมีการใช้ฟังชั่น จะมีการ set ค่าใน Dispatch เท่ากับ null  และจะมีการเปลี่ยนหน้าไปเป็นหน้าแรก*/
    router.push("/");
    dispatch(Logins(null));
  };
  return (
    <div>
      <div className="bg-dark fixed-top">
        <div className="container">
          <header className="d-flex flex-wrap justify-content-center py-3 border-bottom-none">
            <a
              href=""
              className="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none"
            >
              {!user.user ? (
                <span className="fs-4 text-light">Simple getAPI</span>
              ) : (
                <span className="fs-4 text-light">{user.user.username}</span>
              )}
            </a>

            <ul className="nav nav-pills">
              <Link href="/" className="nav-item m4">
                <a className="nav-link">Home</a>
              </Link>
              <Link href="/Dogimage" className="nav-item m4">
                <a className="nav-link">DogImage</a>
              </Link>

              <Link href="/Upload" className="nav-item m4">
                <a className="nav-link">Upload</a>
              </Link>

              {user.user === null ? (
                <Link href="/Login" className="nav-item m4">
                  <a className="nav-link">Login</a>
                </Link>
              ) : (
                <li className="nav-item dropdown text-end">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.user.image == "null" ? (
                        <Image
                        src={"/image/user2.png"}
                        layout="fill"
                        alt="mdo"
                        style={{ backgroundColor: "white" }}
                        width="32"
                        height="32"
                        className="rounded-circle"
                      />
                     
                      
                    ) : (
                      <Image
                      src={
                        "http://localhost:3001/src/imageUser/" +
                        user.user.image
                      }
                      layout="fill"
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                    )}
                  </a>
                  <ul className="dropdown-menu">
                    <Link
                      href={"/management/Profile/" + user.user.userID}
                      className="nav-item m4"
                    >
                      <a className="dropdown-item"> Profile</a>
                    </Link>
                    <Link
                      href={"/management/" + user.user.userID}
                      className="nav-item m4"
                    >
                      <a className="dropdown-item"> Management</a>
                    </Link>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => Signout()}
                      >
                        Signout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </header>
        </div>
      </div>
    </div>
  );
}
