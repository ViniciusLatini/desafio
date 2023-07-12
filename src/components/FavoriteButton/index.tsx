import { Favorite, FavoriteBorder } from '@mui/icons-material';
import './styles.css'

interface FavoriteButtonProps extends React.HTMLProps<HTMLButtonElement>{
  favoriteActive: boolean;
  setFavoriteActive: (value: boolean) => void;
}

function FavoriteButton({setFavoriteActive, favoriteActive}: FavoriteButtonProps) {
  return(
    <button
      type='button'
      onClick={() => {setFavoriteActive(!favoriteActive)}}
      className={favoriteActive ? 'favoriteButtonActive' : 'favoriteButton'}
    >
      {!favoriteActive ? (
        <FavoriteBorder htmlColor='#EFEFF1'/>
      ) : (
        <Favorite htmlColor='#EFEFF1'/>
      )}
      <span>Favoritos</span>

    </button>
  )
}

export default FavoriteButton;