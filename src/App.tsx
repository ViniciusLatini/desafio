import React, {useEffect, useState} from 'react';
import './App.css';


import Card from './components/Card';
import CardSkeleton from './components/CardSkeleton';

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
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<Game []>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(0);
  const [timeoutRequest, setTimeoutRequest] = useState(false);

  const email = "email@email.com";
  const url = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/";

  const filteredGames = search.length > 0 && games.length > 0 // Filtrando os jogos de acordo com a pesquisa
    ? games?.filter(game => game.title.includes(search))
    : [];

  const genres = games.length > 0 //Filtrando generos de forma unica
    ? games?.map(game => game.genre)
    .filter((genre,i,currentValue) => currentValue.indexOf(genre) === i)
    : [];

  // Consulta a API retornando a lista de jogos
  useEffect(() => {
    setIsLoading(true)
    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), 5000);

    try {
      fetch(url, {
        method: "GET",
        mode: "cors",
        signal: ac.signal,
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "dev-email-address": email
        }
      })
      .then((response) => {
        setStatus(response.status)
        clearTimeout(timer);
        return response.json()
      })
      .then(data => setGames(data))
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
        clearTimeout(timer);
      })
    } catch (error) {
      clearTimeout(timer);
      console.log(error);
    }

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
            <option key={genre} id={genre} value={genre}>{genre}</option>
          )}
        </select>

      </div>

      {isLoading ? (
        <div className="cardsContainer">
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
        </div>
      ) : (
        status >= 200 && status <= 299 ? (
          <div className="cardsContainer">
            {search.length > 0  ? (
              filteredGames.map(game => (
                <Card
                  title={game.title}
                  id={game.id}
                  key={game.id}
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
              ))
            ) : (
              games.length > 0 && (
                games.map(game => (
                  <Card
                    title={game.title}
                    id={game.id}
                    key={game.id}
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
                ))
              )
            )}
          </div>
        ) : (
          status >= 500 && status <= 599 ? (
            <div className="errorContainer">
              <h1>Ops! Não conseguimos achar seus jogos ;-;</h1>
              <p>O servidor falhou em responder, tente recarregar a página!</p>
            </div>
          ) : (
            <div className="errorContainer">
              <h1>Ops! Não conseguimos achar seus jogos ;-;</h1>
              <p>O servidor demorou para responder, tente mais tarde</p>
            </div>
          )
        )

      )}
    </div>
  );
}

export default App;