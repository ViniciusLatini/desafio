import { arrayRemove, arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc,  } from "firebase/firestore";
import { firestoreDB } from "../../service/firebase";

export function UserModel() {
  async function create(userId: string) {
    await setDoc(
      doc(firestoreDB, "users", userId), //doc -> retorna o local do documento
      {createdAt: serverTimestamp()}
    );
  }

  async function getFavorites(userId: string) {
    const res = await getDoc(doc(firestoreDB, "users", userId))
    return res.get("favorites");

  }

  async function setFavorite(gameId : number, userId : string) {
    await updateDoc(doc(firestoreDB, "users", userId), {
      favorites: arrayUnion(gameId)
  });
  }

  async function removeFavorite(gameId : number, userId : string) {
    await updateDoc(doc(firestoreDB, "users", userId), {
      favorites: arrayRemove(gameId)
  });
  }

  async function getRating(userId : string) {
    const res = await getDoc(doc(firestoreDB, "users", userId))
    return res.get("rating");
  }

  async function setRating(rating : number, gameId : number, userId : string) {
    await updateDoc(doc(firestoreDB, "users", userId), {
      [`rating.${gameId}`] : rating
    });

  }

  return {setFavorite, setRating, getRating, create, getFavorites, removeFavorite}
}