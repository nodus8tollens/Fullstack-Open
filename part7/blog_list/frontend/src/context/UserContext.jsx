import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, user: action.payload };
    case "USER_LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
