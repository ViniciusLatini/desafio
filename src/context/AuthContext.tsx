import React from 'react';
import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { UserController } from "../core/controllers/User";
import { auth } from "../service/firebase";

interface ContextProps {
  user: {
    id: string
  }
  favorites: number[]

  login: (email: string, senha: string) => void
  teste: () => void
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export function AuthContextProvider({ children } : {children: React.ReactNode}) {

  const [user, setUser] = useState({id: "cCHboWYa9Ar5xjRZe49S"});
  const [favorites, setFavorites] = useState([]);

  async function login(email: string, password: string) {
    try {
        const resp = await signInWithEmailAndPassword(auth, email, password);
        UserController().create(resp.user.uid);
        setUser({id: resp.user.uid});
    } catch (error : any) {
        throw new Error(error);
    }
  }

  async function teste() {
    try {
      const res = await UserController().getFavorites(user.id)
      await setFavorites(res);


    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          const { uid } = user
          if (!uid) {
            setUser({id: ""})
          }
        } else {
          setUser({id: ""})
        }
    })

    return () => {
        unsubscribe()
    }
  }, [])

  return (
      <AuthContext.Provider value={{ user, favorites, login, teste}}>
        {children}
      </AuthContext.Provider>
  )
}
