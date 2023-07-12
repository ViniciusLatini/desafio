import { useEffect, useState, useContext } from 'react';
import LoginIcon from '@mui/icons-material/Login';

import { AuthContext } from '../../context/AuthContext';
import Card from '../../components/Card';
import CardSkeleton from '../../components/CardSkeleton';

import './style.css';
import { Link } from 'react-router-dom';
import { FavoriteBorder, StarBorder } from '@mui/icons-material';
import FavoriteButton from '../../components/FavoriteButton';

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
  rating?: number;
}

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<Game []>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [error, setError] = useState('');
  const [favoriteActive, setFavoriteActive] = useState(false);
  const [ratingSort, setRatingSort] = useState(0);

  const {user, teste, favorites, ratings} = useContext(AuthContext);

  const errorMessages = {
    serverFailed: "O servidor falhou em responder, tente recarregar a página",
    timeoutRequest: "O servidor demorou para responder, tente mais tarde.",
    serverError: "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde"
  }

  const email = "email@email.com";
  const url = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/";

  function filterGames() {
    if(games.length > 0) {
      if(ratingSort > 0) {
        const filteredGames = games.map(game => {
          let gameRating = ratings[game.id] ? ratings[game.id] : 0;
          return {...game, 'rating':gameRating}
        })

        return (
          filteredGames
          .filter(game => favoriteActive ? favorites.includes(game.id) : game)
          .filter(game => selectedGenre !== '' ? game.genre === selectedGenre : game)
          .filter(game => game.title.includes(search))
          .sort((a,b) => ratingSort === 1 ? b.rating - a.rating : a.rating - b.rating)
        );


      } else {
        const filteredGames = games
        return (
          filteredGames
          .filter(game => favoriteActive ? favorites.includes(game.id) : game)
          .filter(game => selectedGenre !== '' ? game.genre === selectedGenre : game)
          .filter(game => game.title.includes(search))
        );
      }
    }
    return [];
  }

  //Filtrando generos de forma unica
  const genres = games.length > 0
    ? games?.map(game => game.genre)
      .filter((genre,i,currentValue) => currentValue.indexOf(genre) === i)
    : [];

  // Consulta a API retornando a lista de jogos
  useEffect(() => {
    setIsLoading(true)
    const ac = new AbortController()

    // Cancelando requisição caso gaste mais que 5s
    const timer = setTimeout(async () => {
      await ac.abort();
      setError(errorMessages.timeoutRequest)
      setIsLoading(false);
    }, 5000);

    // Requisição API
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
        let status = response.status;

        if(status >= 200 && status <= 299)
          setError('');
        else if(status === 500 || (status >= 502 && status <= 504) || (status >= 507 && status <= 509))
          setError(errorMessages.serverFailed);
        else
          setError(errorMessages.serverError);

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

  useEffect(() => {
    if(user.id){ //Verifica se o usuario esta logado
      teste();

    }
  },[user])

  useEffect(() => {
    if(user.id){ //Verifica se o usuario esta logado
      console.log(ratings);
    }
  },[ratings,games])

  return (
    <div>
      <div className="loginContainer">
        <Link to="/auth">
          <LoginIcon htmlColor='#FFF'/>
        </Link>
      </div>

      <div className="headerContainer">
        <input
          type="text"
          name="search"
          placeholder="Procure um jogo"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          name="genres"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
        >
          <option value={''} > Todos gêneros</option>
          {genres.map(genre =>
            <option key={genre} id={genre} value={genre}>{genre}</option>
          )}
        </select>

        <FavoriteButton
          favoriteActive = {favoriteActive}
          setFavoriteActive={setFavoriteActive}
        />

        <button
          type='button'
          className='ratingButton'
          onClick={() => setRatingSort(ratingSort === 2 ? 0 : ratingSort+1)}
        >
          <StarBorder htmlColor='#EFEFF1'/>
        </button>

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
        error === '' ? (
          <div className="cardsContainer">
            {filterGames().map(game => (
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
                favorite={favorites ? favorites.includes(game.id) : false}
                rating={ratings[game.id] ? ratings[game.id] : 0}
              />
            ))}
          </div>
        ) : (
          <div className="errorContainer">
            <h1>Ops! Não conseguimos achar seus jogos ;-;</h1>
            <p>{error}</p>
          </div>
        )

      )}
    </div>
  );
}

export default Home;