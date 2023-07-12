import { Star, StarBorder, ArrowDropUp, ArrowDropDown} from '@mui/icons-material';
import './style.css'

interface RatingButtonProps extends React.HTMLProps<HTMLButtonElement>{
  ratingSort: number;
  setRatingSort: (value: number) => void;
}

function RatingButton({ratingSort, setRatingSort} : RatingButtonProps) {
  return(
    <button
      type='button'
      className={ratingSort > 0 ? 'ratingButtonActive' : 'ratingButton'}
      onClick={() => setRatingSort(ratingSort === 2 ? 0 : ratingSort+1)}
    >
      {ratingSort > 0 ? (
        <Star htmlColor='#EFEFF1'/>
      ) : (
        <StarBorder htmlColor='#EFEFF1'/>
      )}

      <div className='content'>
        <span>Avaliados</span>
        {ratingSort === 1 && <ArrowDropUp htmlColor='#EFEFF1'/>}
        {ratingSort === 2 && <ArrowDropDown htmlColor='#EFEFF1'/>}

      </div>

    </button>
  )
}

export default RatingButton;