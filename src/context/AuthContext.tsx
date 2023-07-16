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
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export function AuthContextProvider({ children } : {children: React.ReactNode}) {

  const [user, setUser] = useState({id: ""});
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});

  async function login(email: string, password: string) {
    try {
      // Autenticação de email e senha no Firebase
      await signInWithEmailAndPassword(auth, email, password)
      .then((resp) => {
        // Salvando token de acesso
        setUser({id: resp.user.uid});
        // Carregando jogos favoritos e avaliados do usuario
        load(resp.user.uid);
      });
    } catch (error : any) {
      throw new Error(error.code);
    }
  }

  async function cadastro(email: string, password: string) {
    try {
      // Criando um token de usuário
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      // Criando um novo usuário no Doc do Firebase
      UserController().create(resp.user.uid);
      // Salvando token de acesso
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

  async function load(userId : string) {
    try {
      setFavorites(await UserController().getFavorites(userId));
      setRatings(await UserController().getRating(userId));
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
    <AuthContext.Provider value={{ user, favorites, ratings ,login, cadastro, updateFavorite, updateRating}}>
      {children}
    </AuthContext.Provider>
  )
}
