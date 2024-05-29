import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'; // importe le composant MovieCard
import CarouselMovie from '../components/CarouselMovie'; // importe le composant CarouselMovie
import '../components/styles/moviegrid.sass' // import le fichier de styles

// Variables d'acces à l'API
const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

// Composant principal de la page Home
const Home = () => {

//Définit un état local pour stocker la liste des films du moment
const [nowMovies, setNowMovies] = useState([])

// Fonction asynchrone pour récupérer les films
const getNowListedMovies = async (url) => {
  const res = await fetch(url) // Fait une requête à l'URL fournie
  const data = await res.json() // Convertit la réponse en JSON
  setNowMovies(data.results) // Met à jour l'état avec les résultats des films
}
  // Hook useEffect pour récupérer les films lorsque le composant est monté
  useEffect(() => {
    const nowMoviesUrl = `${moviesUrl}now_playing?${apiKey}` // Construit l'URL pour récupérer les films
    //console.log(`films du moment : ${nowMoviesUrl}`);
    getNowListedMovies(nowMoviesUrl) //Appelle la fonction pour récupérer les films

  }, [])

  // Rend le contenu de la page
  return (
    <main>
      <div className='container'>
        <CarouselMovie />
        <h2 className="title">Films du moment :</h2>
        <div className="movies-container">
          {nowMovies.length > 0 && nowMovies.map((movie) => <MovieCard key={movie.id}  movie={movie} />)}
        </div>
      </div>
    </main>
  )
}
export default Home
