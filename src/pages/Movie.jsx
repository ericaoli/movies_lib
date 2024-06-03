import { useState, useEffect } from "react" //Hooks de React pour gérer l'état et les effets secondaires.
import { useParams } from "react-router-dom" //Hook de React Router pour accéder aux paramètres de l'URL.
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs" //Icônes du paquet react-icons/bs.
import Youtube from "react-youtube" //Composant pour incorporer des vidéos YouTube.

import "../components/styles/movie.sass" //Importation des styles spécifiques au composant.

//constantes définies dans les variables d'environnement pour accéder à l'API de films.
const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const backgroundImageUrl = import.meta.env.VITE_BACKGROUND_IMG


const Movie = () => {

  const {id} = useParams() // Pour extraire l'ID du film de l'URL.
  const [movie, setMovie] = useState(null) //UseState : pour gérer l'état local du composant, comme les informations du film et l'ID de la bande-annonce.
  const [trailerId, setTrailerId] = useState(null) // bande-annonce
  const [error, setError] = useState(null); // Pour gérer les erreurs.
  const [trailerError, setTrailerError] = useState(null); // Pour gérer l'absence de trailer.

  //Fonction asynchrone pour récupérer les données du film à partir de l'API et mettre à jour l'état movie.
  const getMovie = async(url) => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error("Erreur film.");
      const data = await res.json()
      setMovie(data)
    } catch(error) {
      setError("Les informations ne sont pas disponibles. Veuillez essayer plus tard.");
    }
  } 

// Fonction asynchrone pour récupérer les données de la bande-annonce du film à partir de l'API et mettre à jour l'état trailerId.
  const getTrailer = async(url) => {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error("Erreur bande annonce.");
        const data = await res.json()
        
        if (data.videos && data.videos.results.length > 0) {
          setTrailerId(data.videos.results[0].key)
        } else {
          setTrailerError("La bande annonce n'est pas disponible.");
        }   
      }catch(error) {
        setTrailerError("Les informations de la bande-annonce ne sont pas disponibles. Veuillez essayer plus tard.");
      }
    }
  

// Fonction pour formater un nombre en devise américaine (USD).
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

//Effectue des effets secondaires, comme la récupération des données du film et de la bande-annonce à partir de l'API.
  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}&language=fr`
    getMovie(movieUrl)

    const trailerUrl = `${moviesUrl}${id}?${apiKey}&append_to_response=videos&language=fr`
    getTrailer(trailerUrl)

  }, [id])


// Pour la gestion des erreurs et affichage des informations des films
  const renderMovieInfo = (icon, label, value) => {
    return (
      <div className="info">
        <h3>{icon}{label} : <span>{value ? value : "Information non disponible."}</span></h3>
      </div>
    );
  };
  

  return (
    <div className="container-movie"> {/* Conteneur principal du composant. */}
      {error && <p className="error-message">{error}</p>}{/* Affiche un message d'erreur si une erreur est survenue */}
      
      {/* movie-page: conteneur de l'image de fond du film. */}
      <div className="movie-page"style={{ backgroundImage: movie ? `url('${backgroundImageUrl}${movie.backdrop_path}')` : "none"}}> </div> 
        
        {movie && !error &&(
          <div className="info-grid"> {/* Grille d'information du film, comprenant le titre, le slogan, le budget, les recettes, la durée et la description. */}
            <h1>{movie.title}</h1>
            <h2>{movie.tagline}</h2>
            
            {/* Composant pour afficher la bande-annonce du film. */}
            {trailerId ?
             (<Youtube videoId={trailerId} className="trailer"/>) : (trailerError && <p className="error">{trailerError}</p>)
            } 
           
            {renderMovieInfo(<BsWallet2 />, "Budget", movie.budget ? formatCurrency(movie.budget) : null)}
            {renderMovieInfo(<BsGraphUp />, "Facturation", movie.revenue ? formatCurrency(movie.revenue) : null)}
            {renderMovieInfo(<BsHourglassSplit />, "Durée", movie.runtime ? `${movie.runtime} minutes` : null)}
            {renderMovieInfo(<BsFillFileEarmarkTextFill />, "Description", movie.overview)}
            
          </div>
        )}   
    </div>
  )
}

export default Movie

