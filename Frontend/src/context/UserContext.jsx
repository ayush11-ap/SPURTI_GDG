import { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNo: "",
    address: "",
    role: "",
    roleDetails: {},
  });
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
