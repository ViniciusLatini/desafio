import React, { useEffect, useState} from 'react';
import './App.css';


interface Game {
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

function App() {
  const [games, setGames] = useState<Game []>([]);

  const email = "email@email.com";
  const url = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/";

  useEffect(() => {
    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "dev-email-address": email
      }
    })
    .then(response => response.json())
    .then(data => setGames(data))
  },[])


  return (
    <div>
      <ul>
        {games.map(game => {
          return (
            <li key={game.id}>
              {game.title}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
