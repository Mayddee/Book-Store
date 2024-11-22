// import logo from './logo.svg';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import Catalog from './Catalog/Catalog';
import React, { useState, useMemo, useEffect, createContext, useCallback} from 'react';
import useLocalStorage from 'use-local-storage';
import axios from "axios";

export const  myContext  = createContext([])
export const API_URL = 'https://example-data.draftbit.com/books?_limit=15'
export const users = [
  {
      username: "user1",
      password: "password1"
  },
  {
      username: "user2",
      password: "password2"
  },
  {
      username: "user3",
      password: "password3"
  }
]

function App() {
  const navigate = useNavigate()

  const [favourites, setFavourites] = useState([])

  const [isDark, setDark] = useLocalStorage(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const genres = []
  const [filteredByGenre, setFilteredByGenre] = useState([])
  const addToFavourites = useCallback((book) => {
    const oldFavourites = [...favourites];
    const newFavourites = oldFavourites.concat(book)
    setFavourites(newFavourites)
    
  }, [favourites])

  const removeFromFavourites = (id) => {
    const oldFavourites = [...favourites]
    const newFavourites = oldFavourites.filter((book) => book.id !== id)
    setFavourites(newFavourites)
  }
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
      axios.get(API_URL).then(res => {
          console.log(res.data)
          const fetchedBooks = res.data;

          setBooks(res.data)

      //     fetchedBooks.forEach((book) => {
      //       const bookGenres = book.genre_list.split(',')
      //       // if(book[genres]){
      //         console.log("book genres: ", book.genre_list)
      //         bookGenres.forEach((genre) => {
      //           if(!genres.some((thisGenre) => thisGenre === genre)){
      //             genres.push(genre)
      //           }
      //         })
              
      //       // }
      //       console.log("book genres2: ", bookGenres)
      //       return {fetchedBooks}
      //     })
          

      // }).then((fetchedBooks) => {
      //   console.log("Genres: ", genres, ", length: ", genres.length)
      //   const randomIndex = Math.floor(Math.random() * genres.length)
      //   console.log("Random index: ", randomIndex)

      //   setFilteredByGenre((fetchedBooks.filter((book) => {
      //     const bookGenres = book.genre_list.split(',')

      //     return bookGenres.some((genre) => {
      //       if(genres.length === 0) return false
      //       console.log("genre that array is filtered by: ", genres[randomIndex])
      //       return genre === genres[randomIndex]

      //     })
      //   })))
      //   console.log("Genres: ", genres)
      }
            
      )
      .catch(err => console.log(err))

      
  }, [])

  console.log("Books filtered by a random genre: ", filteredByGenre)


  const [bookProperty, setBookProperty] = useState("books");
  const [isLoggedIn, setLoggedIn] = useState(false)
  

const handleLogout = () => {
  setLoggedIn(false)
  setUsername("")
  setPassword("")
}

const login = (username, password) => {
  if(username && password && users.find((user) => user.username === username && user.password === password)){
    setUsername(username)
    setPassword(password)
    setLoggedIn(true)

  }else {
    console.log("Wong credentials!")
  }

}
  
  useEffect(() => {
    if(username){
      console.log("User ", username, " has logged in!")
    }else {
      console.log("User ", username, " has logged out!")

    }
  }, [username])

  
  // const [error, setError] = useState(null)
    // useEffect(() => {
    //     fetch("/books.json")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data); // Log the data to see the structure
    //       setCards(data);
    //   })
    //     .catch((error) => setError(error.message))
    // }
    
    // , [])

    const contextValue = useMemo(() => ({
      books,
      isDark,
      favourites,
      isLoggedIn,
      setLoggedIn,
      setUsername,
      setPassword,
      login,
      handleLogout,
      addToFavourites,
      removeFromFavourites,
      filteredByGenre
    }), [
      books.length, // Use array length or a derived value instead of the whole array
      isDark,
      favourites.length,
      isLoggedIn,
    ]);
    
  return (
    <div className="App" data-theme={isDark ? "dark" : "light"} >
      <myContext.Provider value={contextValue}>
        <Header 
        handleChange={() => setDark(!isDark)} 
        isChecked={isDark}/>
        <div style={
          {
          paddingTop: "100px"
          }
        } >
          {/* {error ? (<h1>Error: {error}</h1>) : <Outlet context={{ cards }} />} */}
          <Outlet  />
        </div>
      </myContext.Provider>
      
    </div>
  );
}

export default App;
