import { GET_NOTE, USER_LOGIN, USER_LOGOUT } from "./user.actionType";


const initState = {
  notes: [],
  accessToken: localStorage.getItem("kodeglobe") || "",
  email: localStorage.getItem("kodeglobeEmail") || "",
  uid: "",
};

export const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN: { 
      localStorage.setItem("kodeglobe", payload.accessToken);
      localStorage.setItem("kodeglobeEmail", payload.email);
      return {
        ...state,
        accessToken: payload.accessToken,
        email: payload.email,
        uid: payload.uid,
      };
    }
    case USER_LOGOUT: {
      localStorage.removeItem("kodeglobe")
      localStorage.removeItem("kodeglobeEmail")
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
