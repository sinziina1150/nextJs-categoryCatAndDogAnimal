import { Types } from "../Type";


// Action redux สำหรับ set ค่า user Login
export function Logins  (user)  {
  return {
    type: Types.LOGIN_USER,
    payload: user,
  };
};

