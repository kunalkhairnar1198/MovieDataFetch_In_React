import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  //making api request to get the data inside the component 
  async function fetchMovieHandler(){
    try{ 
      setIsLoading(true)

    const response = await fetch('https://swapi.dev/api/films/')
    
      const data = await response.json()
      
        const transformedMovies = data.results.map((movieData)=>{
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl
          }
        })

       setMovies(transformedMovies)
       setIsLoading(false)
      } catch(error){
        console.log('handle the error in the  block',error)
      }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <h1>Data is not found</h1>}
        {isLoading && <p className='loader'></p>}
      </section>
    </React.Fragment>
  );
}

export default App;
