import { arrayRemove, arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc,  } from "firebase/firestore";
import { firestoreDB } from "../../service/firebase";

export function UserModel() {
  async function create(userId: string) {
    // Cria um usuário com o userId (token de autenticação) no documento
    await setDoc(
      doc(firestoreDB, "users", userId), //doc -> retorna o local do documento
      {createdAt: serverTimestamp()}
    );
  }

  async function getFavorites(userId: string) {
    // Retorna os dados do usuário pelo token de autenticação
    const res = await getDoc(doc(firestoreDB, "users", userId))
    // Retornando os favoritos do usuário selecionado
    return res.get("favorites");

  }

  async function setFavorite(gameId : number, userId : string) {
    // Busca o usuário pelo token
    await updateDoc(doc(firestoreDB, "users", userId), {
      favorites: arrayUnion(gameId) // Incrementa o array de favoritos utilizando o gameId
      // favorites === [number]
  });
  }

  async function removeFavorite(gameId : number, userId : string) {
    // Busca o usuário pelo token
    await updateDoc(doc(firestoreDB, "users", userId), {
      favorites: arrayRemove(gameId) // Realiza um pop no array favorites do game informado
  });
  }

  async function getRating(userId : string) {
    // Retorna os dados do usuário pelo token de autenticação
    const res = await getDoc(doc(firestoreDB, "users", userId))
    // Retornando as avaliações do usuário selecionado
    return res.get("rating");
  }

  async function setRating(rating : number, gameId : number, userId : string) {
    // Busca o usuário pelo token
    await updateDoc(doc(firestoreDB, "users", userId), {
      [`rating.${gameId}`] : rating // Atualiza a lista de jogos avaliados
      // Foi utilizado um discionário com dot notation para realizar uma busca de O(1)
      // Dessa forma não é necessário percorrer a lista
    });

  }

  return {setFavorite, setRating, getRating, create, getFavorites, removeFavorite}
}