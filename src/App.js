import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)  
  const [retrying, setRetrying] = useState(false)

  

  //making api request to get the data inside the component 
   const fetchMovieHandler= useCallback( async() =>{

    setIsLoading(true)
    setIsError(null)

    try{ 
      
    const response = await fetch('https://swapi.dev/api/films/')
    

      if(!response.ok){
        throw new Error('Something went wrong ...retrying !')
      }

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
      } catch(error){
        setIsError(error.message)
        setRetrying(true)
      }
      setIsLoading(false)
  },[])

  //when useEffect is used persistatly update api call when app starts
  useEffect(()=>{
    fetchMovieHandler(); 
   },[fetchMovieHandler]);

  const cancelRetrying =()=>{
    setIsError(false)
     setRetrying(false)
     
  }

  //error handling and data passing throgw the component and loading content 
  let content = <p>Found no moveis...</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  if(movies.length === 0){
    content = <p>Data is not found</p>
  }

  if(isLoading){
    content = <p className='loader'>Loading......</p>
  }
  
  if (isError) {
    content = (
      <p>
        {isError} <button onClick={cancelRetrying}>cancel</button>
      </p>
    );
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !isError && <h1>Data is not found</h1>}
        {isLoading && <p className='loader'></p>}
        {!isLoading && isError && <p>{isError}</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
