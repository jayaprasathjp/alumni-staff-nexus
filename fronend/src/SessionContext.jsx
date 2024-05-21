// SessionContext.js
import React, { createContext, useState, useContext } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const data=sessionStorage.getItem("user");
  let Role,Name;
  if(data!=null){
   Role=JSON.parse(data).role;
   Name=JSON.parse(data).name;
  }
  const [name, setName] = useState(Name);
  const [pass, setPass] = useState('');
  const [role,setRole]  = useState(Role);
  return (
    <SessionContext.Provider value={{ name, setName, pass, setPass,role,setRole }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
