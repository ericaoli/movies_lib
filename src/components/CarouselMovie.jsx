import Carousel from 'better-react-carousel'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles/carousel.sass'


const heroImageUrl = import.meta.env.VITE_HERO_IMG
const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY


const getRandomItems = (array, numItems) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };


const CarouselMovie = () => {
    const [heros, setHero] = useState([])

    const getHeroMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setHero(data.results)
        console.log(data.results);
    }
    useEffect(() => {
        const heroUrl = `${moviesUrl}top_rated?${apiKey}&language=fr`
        console.log(`heroUrl : ${heroUrl}`);
        getHeroMovies(heroUrl)
    
      }, [])

      const randomHeros = heros.length > 0 ? getRandomItems(heros, 4) : [];
      const showLink = true
      
      const truncateTextByWords = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length <= maxWords) {
          return text;
        }
        return words.slice(0, maxWords).join(' ') + '...';
      };
  

  return (
          <div className="hero-carousel">
            <Carousel  cols={1} rows={1} gap={10} loop> 
                {randomHeros.map((hero, index) => (
                  <Carousel.Item key={index}> 
                    <div  key={index} className="hero-slide" style={{ backgroundImage: `url('${heroImageUrl}${hero.backdrop_path}')`}}>
                    </div>
                    <div className="info-hero">
                      <h2 className='hero-title'>{hero.title}</h2>
                      <p className="hero-overview">{truncateTextByWords(hero.overview, 40)}</p>
                      {showLink && <Link className="hero-button"to={`/movie/${hero.id}`}>En savoir plus</Link>}
                    </div>
              </Carousel.Item>
            ))} 
            </Carousel>
            </div>
        )
}

export default CarouselMovie
