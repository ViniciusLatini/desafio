import React, { useContext, useState } from 'react';
import './style.css';
import { Checkbox, Fade, Rating } from '@mui/material';
import { Favorite, FavoriteBorder, StarBorder } from '@mui/icons-material';
import { UserController } from '../../core/controllers/User';
import { AuthContext } from '../../context/AuthContext';

interface CardProps {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  favorite: boolean;
  rating: number;
  setOpen: (value: boolean) => void;
}

function Card({title, thumbnail, genre, id, favorite, rating, setOpen}:CardProps) {
  const {user, updateFavorite, updateRating} = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [gameRating, setGameRating] = useState(rating);

  return(
    <Fade in={true} timeout={1000}>
      <div className='cardContainer'>
        <img src={thumbnail} alt={title} />

        <div className='descriptionContainer'>
          <div className='infos'>
            <strong>{title}</strong>
            <span className='genre'>{genre}</span>
          </div>
          <div className='buttons'>
            <Rating
              size="small"
              emptyIcon={<StarBorder style={{ color:"#D4D4D8", pointerEvents: "auto" }} fontSize="inherit" />}
              value={gameRating}
              onChange={async(event, newValue) => {
                if(!user.id){
                  event.preventDefault();
                  setOpen(true);
                  setGameRating(0);
                  console.log(event);

                  console.log(gameRating);

                }
                else if(newValue) {
                  setGameRating(newValue);
                  await UserController().setRating(newValue, id, user.id);
                  updateRating();
                }
              }}
            />

            <Checkbox
              icon={<FavoriteBorder className='favorite' />}
              checked={isFavorite}
              checkedIcon={<Favorite className='favoriteActive' />}
              onClick={async() => {
                if(!user.id){
                  setOpen(true);
                  return
                }
                setIsFavorite(!isFavorite)

                if(!isFavorite) {
                  await UserController().setFavorite(id, user.id)
                  .catch(
                    error => {
                      if(error.message === "Nao logado") {
                        //enviar pro login
                      } else {
                        //lançar aviso
                      }
                    }
                  )
                } else {
                  await UserController().removeFavorite(id,user.id)
                  .catch(
                    error => {
                      if(error.message === "Nao logado") {
                        //enviar pro login
                      } else {
                        //lançar aviso
                      }
                    }
                  )
                }
                updateFavorite();
              }}
            />
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default Card;