import React from 'react'
import Profile from '.'
import axios from 'axios';

// ฟังชั่นสำหรับดึงข้อมูลของ userID ที่จะนำมาแก้ไขข้อมูล และส่งข้อมูล ผ่าน props
export async function getServerSideProps(context) {
    const res = await axios.get(
      `http://localhost:3001/useranimal/GetByID/${context.params.profileid}`
    );
    const useData = res.data.data;
    return {
      props: {
        data: useData[0],
      },
    };
  }

// export ข้อมูลไปที่ component Profile
export default Profile