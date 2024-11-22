import React, {useState, useEffect, useMemo, memo } from "react";
import Card from "./Card";

const CardList = memo(({ books }) => {
    
    if (!books || books.length === 0) {
        return <h2>No books available.</h2>; // Add fallback when cards array is empty
      }
    // const [cards, setCards] = useState([])
    // const cards = useMemo(()=> {
    //     return array
    // }, array)
    // useEffect(() => {
    //     fetch(srcLink)
    //     .then((response) => response.json())
    //     .then((data) => setCards(data))
    //     .catch((error) => <h1>Error occured</h1>)
    // }, [srcLink])
    return (
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
    )
})
export default CardList