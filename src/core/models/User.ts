import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../service/firebase";

export function UserModel() {
  async function create(userId: string) {
    await setDoc(
      doc(firestoreDB, "users", userId), //doc -> retorna o local do documento
      {createdAt: serverTimestamp()}
    );

  }

  async function setFavorite(gameId : number, userId : string) {
    await updateDoc(doc(firestoreDB, "users", userId), {
      favorites: arrayUnion(gameId)
  });
  }

  async function setRating(rating : number, gameId : number, userId : string) {
    await updateDoc(doc(firestoreDB, "users", userId), {
      [`rating.[${gameId}]`] : rating
    });

  }

  return {setFavorite, setRating, create}
}