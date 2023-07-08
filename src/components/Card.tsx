import React from 'react';
import './Card.css';
import { Checkbox, Rating } from '@mui/material';
import { Favorite, FavoriteBorder, StarBorder } from '@mui/icons-material';

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
}

function Card({title, thumbnail, genre}:CardProps) {
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
          />

          <Checkbox
            icon={<FavoriteBorder className='favorite' />}
            checkedIcon={<Favorite className='favoriteActive' />}
          />
        </div>
      </div>
    </div>
  )
}

export default Card;