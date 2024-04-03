import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Input from './components/Inputcompo/Input';

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
      //get request is default request send inside the fetch function
    const response = await fetch('https://react-http-30a1e-default-rtdb.firebaseio.com/movies.json')
    

      if(!response.ok){
        throw new Error('Something went wrong ...retrying !')
      }

      const data = await response.json()
      // console.log(data)

        //that will stored firebase object in the loadedMovies array 
        const loadedMovies = []

        for(const key in data ){
            loadedMovies.push({
              id:key,
              title: data[key].title,
              openingText:data[key].openingText,
              releaseDate:data[key].releaseDate
            })
        }
        console.log(loadedMovies)
        //they didn't map firebase objects because firebase store nested object inside the firebase database
        // const transformedMovies = data.results.map((movieData)=>{
        //   return {
        //     id: movieData.episode_id,
        //     title: movieData.title,
        //     releaseDate: movieData.release_date,
        //     openingText: movieData.opening_crawl
        //   }
        // })
      //  setMovies(transformedMovies)

      //when firebase loaded nested object store on loadedmovies array setMovies State
       setMovies(loadedMovies)
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

  const enteredDataUpdate = async(enteredData)=>{
    try{
     const response =  await fetch('https://react-http-30a1e-default-rtdb.firebaseio.com/movies.json',{
        method:'POST',
        body:JSON.stringify(enteredData), //when form submit data post request send an stored on the firebase api endpoint
        headers:{
          'Content-Type':'application/json'
        }
      })
        const data = await response.json()
        console.log(data)
    } catch(err){
      console.log(err)
      }
  }

  const deleteHandler =async(movie_id)=>{
      try {
        const response =  await fetch('https://react-http-30a1e-default-rtdb.firebaseio.com/movies.json',{
        method:'DELETE',
        body:JSON.stringify(movie_id), 
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data = await response.json()

      const updatedMovies = movies.filter(movie => movie.id !== movie_id)
      setMovies(updatedMovies)

      console.log('deletehandler works')
      console.log(data)
      } catch (error) {
          console.log(error)      
      }
  }

  //error handling and data passing throgw the component and loading content 
  let content = <p>Found no moveis...</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} ondeleteHandler ={deleteHandler} />
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
          <Input onEnteredDataReceive ={enteredDataUpdate}/>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
