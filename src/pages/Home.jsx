import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import CarouselMovie from '../components/CarouselMovie';
import '../components/styles/home.sass'
import '../components/styles/moviegrid.sass'


const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
  const [topMovies, setTopMovies] = useState([])

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setTopMovies(data.results)
    console.log(data.results);
  }

  
  useEffect(() => {
    const topRatedUrl = `${moviesUrl}now_playing?${apiKey}`
    console.log(`topRatedUrl : ${topRatedUrl}`);
    getTopRatedMovies(topRatedUrl)

  }, [])

  

  return (
    <main>
      <div className='container'>
        <CarouselMovie />
        <h2 className="title">Films du moment :</h2>
        <div className="movies-container">
          {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id}  movie={movie} />)}
        </div>
      </div>
    </main>

  )
  
}

export default Home
