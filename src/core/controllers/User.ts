import { UserModel } from "../models/User";

export function UserController() {
  async function create(userId : string) {
    await UserModel().create(userId);
  }

  async function setFavorite(gameId : number, userId: string) {
    if(userId) {
      await UserModel().create(userId);
    } else {
      throw new Error("Nao logado");
    }
  }

  async function setRating(rating : number, gameId : number, userId: string) {
    if(userId) {
      await UserModel().create(userId);
    } else {
      throw new Error("Nao logado");
    }
  }

  return {setFavorite, setRating, create}
}