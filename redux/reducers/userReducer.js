import { Types } from "../Type";

const initialState = {
  user: null
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_USER: {
      return {
        user: action.payload,
      };
    }
    default:
      return state;
  }
}
