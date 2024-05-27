import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs"
import Youtube from "react-youtube"

import "../components/styles/movie.sass"

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY


const Movie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerId, setTrailerId] = useState(null)

  const getMovie = async(url) => {
    const res = await fetch(url)
    const data = await res.json()
    setMovie(data)

  } 


  const getTrailer = async(url) => {
    const res = await fetch(url)
    const data = await res.json()
    
    
    if (data.videos && data.videos.results.length > 0) {
      setTrailerId(data.videos.results[0].key)
    }

  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`
    getMovie(movieUrl)

    const trailerUrl = `${moviesUrl}${id}?${apiKey}&append_to_response=videos`
    getTrailer(trailerUrl)

  }, [id])

  const backgroundImageUrl = import.meta.env.VITE_BACKGROUND_IMG

  return (
    <div className="container-movie">
      <div className="movie-page"style={{ backgroundImage: movie ? `url('${backgroundImageUrl}${movie.backdrop_path}')` : "none"}}></div> 
      {movie && (
        
        <div className="info-grid">
          <h1>{movie.title}</h1>
          <h2>{movie.tagline}</h2>

          {trailerId && <Youtube videoId={trailerId} className="trailer"/>}
           
          <div className="info">
            <h3><BsWallet2 /> Budget :  <span>{formatCurrency(movie.budget)}</span></h3> 
          </div>

          <div className="info">
              <h3><BsGraphUp/> Facturation :  <span>{formatCurrency(movie.revenue)}</span></h3> 
          </div>

          <div className="info">
              <h3> <BsHourglassSplit /> Durée : <span>{movie.runtime} minutes</span> </h3>
          </div>  

          <div className="info description">  
            <h3><BsFillFileEarmarkTextFill /> Description : <span>{movie.overview}</span></h3>
          </div>
        </div> 
        
      )}  
</div>
  )
}

export default Movie

