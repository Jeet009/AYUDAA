import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [authStatus, setAuthStatus] = useState(false);
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setAuthStatus(true);
    }
  });

  return (
    <AuthContext.Provider value={authStatus}>
      {props.children}
    </AuthContext.Provider>
  );
}
