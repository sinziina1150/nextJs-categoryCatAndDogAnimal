import React from 'react'
import Profile from '.'
import axios from 'axios';

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


export default Profile