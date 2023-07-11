import React, { useContext, useState } from 'react';
import './Card.css';
import { Checkbox, Rating } from '@mui/material';
import { Favorite, FavoriteBorder, StarBorder } from '@mui/icons-material';
import { UserController } from '../core/controllers/User';
import { AuthContext } from '../context/AuthContext';

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
  rating: number
}

function Card({title, thumbnail, genre, id, favorite, rating}:CardProps) {
  const {user, updateFavorite, updateRating} = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [gameRating, setGameRating] = useState(rating);

  return(
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
            emptyIcon={<StarBorder style={{ color:"#D4D4D8" }} fontSize="inherit" />}
            value={gameRating}
            onChange={async(event, newValue) => {
              if(newValue) {
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
  )
}

export default Card;