import React, { createContext, memo, useState, useEffect, useContext } from "react";
import CardList from "../Card/CardList";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import Card from "../Card/Card";
import Details from "../DetailsPage/Details";
import useLocalStorage from "use-local-storage";
import { API_URL, myContext } from "../App";
import axios from "axios";

const Favourites = memo(() => {
    const { favourites, isDark} = useContext(myContext)

    // const { cards, favourites, addToFavourites, removeFromFavourites } = useOutletContext()//changed cards to { cards } as cards are object
    console.log(favourites);  // Log to ensure you're getting the correct data

    // const [books, setBooks] = useState([])

   

    const location = useLocation()
    const pathSegments = location.pathname.split('/')

    const { id }  = useParams()  // Retrieve `id` from the URL params

    // If `id` is present, render the `Details` component

    // Так :id это child path of catalog мы должны как то взаймодействовать со страницей Details в Parent component
    // если id правильно указан то возвращаем Details jsx, если неправильно то ошибку
    //если ваще не указано то Catalog 
    if (id) {
        // const books = favourites
        const card = favourites.find((card) => card.id === parseInt(id));
        if (!card) {
            return <h1>Book not found</h1>;
        }
        return <Details card={card} />;  // Pass the found card to `Details`
    }

    console.log({ favourites });

    return (
        <div className="favourites">
            <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
        
        }}>{favourites.length > 0 ?  <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            margin: "0 200px"
            }} >
            {favourites.map((book, key) => (
            <Card key={book.id} card={book} id={book.id} />
            ))}
            </div> : <h1>You do not have Favourites list yet!</h1>}
      
          </div>
        </div>
    )
})

export default Favourites