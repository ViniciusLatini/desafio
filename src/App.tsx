import React, {useEffect, useState} from 'react';
import './App.css';

import Card from './components/Card';

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
  const [search, setSearch] = useState('');

  const email = "email@email.com";
  const url = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/";

  const filteredGames = search.length > 0 // Filtrando os jogos de acordo com a pesquisa
    ? games.filter(game => game.title.includes(search))
    : [];

  const genres = games.length > 0 //Filtrando generos de forma unica
    ? games.map(game => game.genre)
    .filter((genre,i,currentValue) => currentValue.indexOf(genre) === i)
    : [];

  console.log(genres)

  // Consulta a API retornando a lista de jogos
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
      <div className="headerContainer">
        <input
          type="text"
          name="search"
          placeholder="Procure um jogo"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select name="genres" >
          <option value={''} hidden> Escolha um genero</option>
          {genres.map(genre =>
            <option id={genre} value={genre}>{genre}</option>
          )}
        </select>
      </div>

      {search.length > 0 && games.length > 0 ? (
        <div className="cardsContainer">
          {filteredGames.map(game => {
            return (
              <Card
                title={game.title}
                id={game.id}
                thumbnail={game.thumbnail}
                short_description={game.short_description}
                game_url={game.game_url}
                genre={game.genre}
                platform={game.platform}
                publisher={game.publisher}
                developer={game.developer}
                release_date={game.release_date}
                freetogame_profile_url={game.freetogame_profile_url}
              />
            )
          })}
        </div>
      ) : (
        <div className="cardsContainer">
          {games.map(game => {
            return (
              <Card
                title={game.title}
                id={game.id}
                thumbnail={game.thumbnail}
                short_description={game.short_description}
                game_url={game.game_url}
                genre={game.genre}
                platform={game.platform}
                publisher={game.publisher}
                developer={game.developer}
                release_date={game.release_date}
                freetogame_profile_url={game.freetogame_profile_url}
              />
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
