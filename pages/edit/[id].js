import React, { useEffect, useState ,Fragment } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Navbar from "../../components/Navbar"
export default function Animal  ({ data })  {
  const [name, setName] = useState([]);
  const [weight, setWeight] = useState([]);
  const [heigth, setHeigth] = useState([]);
  const [image, setImage] = useState(null);
  const router = useRouter();

  // set ข้อมูลที่รับมากจาก props และนำมาเซตไว้ตัวตัวแปล updateData
  const [updatedata, setUpdatedata] = useState(data);


  // ฟังชั่น สำหรับ อัพเดทข้อมูล
  const onchangeData = (e) => {
    const { name, value } = e.target;
    setUpdatedata({ ...updatedata, [name]: value });
  };

// ฟังชั่นสำหรับการ upload File Image
  const onFileChange = (e) => {
    console.log(e)
    if (e.target && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      setUpdatedata({ ...updatedata, image: file });
    } 
  };

  // ฟังชั่นสำหรับ UpdateData เพื่อส่งข้อมูลไปหา Back-end
  const UpdateData = async (e) => {
    e.preventDefault();
    console.log(e); 
    const formdata = new FormData();
    formdata.append("name", updatedata.name);
    formdata.append("weight", updatedata.weight);
    formdata.append("heigth", updatedata.heigth);
    formdata.append("image", updatedata.image);
    
    await axios
      .put(`http://localhost:3001/animals/editData/${data.animalID}`, formdata)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          router.push("/Upload");
        }
      });
  };

  return (
    <>
      {router.isFallback ? (
        <h1>loading...</h1>
      ) : (
        <div className="container" style={{ marginTop: "100px" }}>
          <form id="postData">
            <div className="row">
              <div className="col-lg-6">
                <label>Name :</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                  value={updatedata.name}
                  onChange={(e) => onchangeData(e)}
                />
              </div>
              <div className="col-lg-6">
                <label>weight :</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  name="weight"
                  value={updatedata.weight}
                  onChange={(e) => onchangeData(e)}
                />
              </div>
              <div className="col-lg-6 mt-2">
                <label>heigth :</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  name="heigth"
                  value={updatedata.heigth}
                  onChange={(e) => onchangeData(e)}
                />
              </div>
              <div className="col-lg-6 mt-2">
                <label>Image :</label>
                <input
                  type="file"
                  className="form-control"
                  required
                  placeholder={updatedata.image}
                  // value={updatedata.image}
                  name="image"
                  onChange={(e) => onFileChange(e)}
                />
              </div>
              <div className="col-lg-6 mt-2"></div>
              <div className="col-lg-6 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={(e) => UpdateData(e)}
                >
                  Update
                </button>
              </div>
              <div className="border-bottom mt-3"></div>
            </div>
          </form>
          <div className="col mt-3">
            <div
              className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg mb-5"
              style={{
                width: "500px",
                height: "500px",
              }}
            >
              {!image ? (
                <img
                  src={`http://localhost:3001/src/upload/${data.image}`}
                  height={450}
                />
              ) : (
                <img src={image} height={450} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};



// ฟังชั่นสำหรับดึงข้อมูลของ animal ID ที่จะนำมาแก้ไขข้อมูล และส่งข้อมูล ผ่าน props
export async function getServerSideProps(context) {
  console.log(context.params.id);
  const res = await axios.get(
    `http://localhost:3001/animals/getanimalByid/${context.params.id}`
  );
  const data = res.data;
  console.log(data)
  return {
    props: {
      data: data[0],
    },
  };
}


Animal.getLayout = function getLayout(page) {
  return (
    <Fragment>
      <Navbar />
      {page}
    </Fragment>
  );
};
