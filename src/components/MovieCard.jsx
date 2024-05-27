import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import PropTypes from 'prop-types'

import './styles/moviegrid.sass'

const imageUrl = import.meta.env.VITE_IMG

const MovieCard = ({movie, showLink = true}) => {

  return (
    <div className="movie-card">
        <img src={imageUrl + movie.poster_path} alt={movie.title} /> 
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>En savoir plus</Link>}
    </div>
  )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    }). isRequired,
    showLink: PropTypes.bool
}

export default MovieCard
