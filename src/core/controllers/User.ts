import { UserModel } from "../models/User";

export function UserController() {
  async function create(userId : string) {
    await UserModel().create(userId);
  }

  async function getFavorites(userId : string) {
    if(userId) {
      return await UserModel().getFavorites(userId);
    } else {
      throw new Error("Nao logado");
    }
  }

  async function setFavorite(gameId : number, userId: string) {
    if(userId) {
      await UserModel().setFavorite(gameId, userId);
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

  return {setFavorite, getFavorites, setRating, create}
}