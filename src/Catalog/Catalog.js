import React, { createContext, memo, useState, useEffect, useContext } from "react";
import CardList from "../Card/CardList";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import Card from "../Card/Card";
import Details from "../DetailsPage/Details";
import useLocalStorage from "use-local-storage";
import { API_URL, myContext } from "../App";
import "./Catalog.css"
// import axios from "axios";
// to avoid error as .map() is not a function, ensure that cards imported properly
//in this case - cards (useOutletContext) => { cards }


export const context = createContext([])
const Catalog = memo(() => {
    const {books, isDark} = useContext(myContext)

    // const { cards, favourites, addToFavourites, removeFromFavourites } = useOutletContext()//changed cards to { cards } as cards are object
    // console.log(cards);  // Log to ensure you're getting the correct data

    

    const location = useLocation()
    const pathSegments = location.pathname.split('/')

    const { id }  = useParams()  // Retrieve `id` from the URL params

    // If `id` is present, render the `Details` component

    // Так :id это child path of catalog мы должны как то взаймодействовать со страницей Details в Parent component
    // если id правильно указан то возвращаем Details jsx, если неправильно то ошибку
    //если ваще не указано то Catalog 
    if (id) {
        
        const card = books.find((card) => card.id === parseInt(id));
        if (!card) {
            return <h1>Book not found</h1>;
        }
        return <Details card={card} />;  // Pass the found card to `Details`
    }

    console.log({ books });

    return (
        <div className="catalog">
            <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
        
        }}>
            {/* {
            cards && cards.length > 0 && Array.isArray(cards) ? (
                cards.map((card) => (
                <Card key={card.id} card={card} />
         ))
         ): <h1>No cards available!</h1>
         } */}
         {/* <context.Provider value={{ cards, favourites, addToFavourites, removeFromFavourites}}> */}
            <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            margin: "0 200px"
            }} >
            {books.map((book, key) => (
            <Card key={book.id} card={book} id={book.id} />
            ))}
            </div>
         {/* </context.Provider> */}
         
         
           
        </div>
        </div>
    )
})
export default Catalog;