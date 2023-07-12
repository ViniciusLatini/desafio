import React from 'react';
import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { UserController } from "../core/controllers/User";
import { auth } from "../service/firebase";

interface ContextProps {
  user: {
    id: string
  }
  favorites: number[]
  ratings: {
    [key: string]: number
  }

  login: (email: string, senha: string) => void
  cadastro: (email: string, senha: string) => void
  updateFavorite: () => void
  updateRating: () => void
  load: () => void
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export function AuthContextProvider({ children } : {children: React.ReactNode}) {

  const [user, setUser] = useState({id: ""});
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});

  async function login(email: string, password: string) {
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      setUser({id: resp.user.uid});
    } catch (error : any) {
      throw new Error(error.code);
    }
  }

  async function cadastro(email: string, password: string) {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      UserController().create(resp.user.uid);
      setUser({id: resp.user.uid});
    } catch (error : any) {
      throw new Error(error.code);
    }
  }

  async function updateFavorite() {
    try {
      setFavorites(await UserController().getFavorites(user.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function updateRating() {
    try {
      setRatings(await UserController().getRating(user.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function load() {
    try {
      setFavorites(await UserController().getFavorites(user.id));
      setRatings(await UserController().getRating(user.id));
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
      <AuthContext.Provider value={{ user, favorites, ratings ,login, cadastro, load, updateFavorite, updateRating}}>
        {children}
      </AuthContext.Provider>
  )
}
