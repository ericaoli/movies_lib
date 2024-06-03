import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

import "./styles/moviegrid.sass";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  // Vérifie si les informations sont disponibles
  const missingInfoCount = [
    !movie.poster_path,
    !movie.title,
    !movie.vote_average,
  ].filter(Boolean).length;

  // Si 1 ou plus d'informations ne sont pas disponibles, n'affiche pas le MovieCard
   if (missingInfoCount >= 1) {
     return null;
   }

  return (
    <div className="movie-card">
      {movie && (
        <>
          {movie.poster_path ? (
            <img src={imageUrl + movie.poster_path} alt={movie.title} />
          ) : (
            <p className="error">Image non disponible</p>
          )}
          <h2>{movie.title || "Titre non disponible"}</h2>
          <p>
            <FaStar /> {movie.vote_average || "Note non disponible"}
          </p>
          {showLink && <Link to={`/movie/${movie.id}`}>En savoir plus</Link>}
        </>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  showLink: PropTypes.bool,
};

export default MovieCard;
