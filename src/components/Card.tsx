import React from 'react';
import './Card.css';

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
        <strong>{title}</strong>
        <span>{genre}</span>
      </div>
    </div>
  )
}

export default Card;