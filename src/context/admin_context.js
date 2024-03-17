import { createContext, useContext, useReducer } from "react";
import AdminReducer from "./admin_reducer";

const initialState = {
    currentUser: null,
  };
const AdminContext = createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  // Your context provider logic...

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
