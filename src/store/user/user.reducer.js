import { GET_NOTE, USER_LOGIN, USER_LOGOUT } from "./user.actionType";

const initState = {
  notes: [],
  accessToken: "",
  email: "",
  uid: "",
};

export const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN: {
      return {
        ...state,
        accessToken: payload.accessToken,
        email: payload.email,
        uid: payload.uid,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        accessToken: "",
        email: "",
        uid: "",
        notes: [],
      };
    }
    case GET_NOTE: {
      return {
        ...state,
        notes: payload,
      };
    }
    default: {
      return state;
    }
  }
};
