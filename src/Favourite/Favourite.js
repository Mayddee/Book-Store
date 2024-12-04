import React, { useContext, useEffect, useMemo, useState, useCallback, memo } from "react";
// import { FaFav}
import { FaHeart } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
import { myContext } from "../App";
// import { context } from "../Catalog/Catalog";

const Favourite = memo(({id, book}) => {
    // const [isClicked, setClicked] = useLocalStorage(false);
    const { cards, favourites, addToFavourites, removeFromFavourites} = useContext(myContext)

    useEffect(()=> {
        console.log("favourites are: ", favourites)
    }, [favourites])
    
    // useEffect(() => {

    // }, [book])

    // const isFavourite = book?.favourite || false;


    const handleOnClick = useCallback(() => {
        // setClicked(!isClicked)
        // toggleToFavourites(id)
        favouritesChecker(book.id) ? removeFromFavourites(id) : addToFavourites(book)
        console.log(`We clicked favourite button for item id: ${id} !`)
    }, [addToFavourites, book])

    const favouritesChecker = (id) => {
        const boolean = favourites.some((book) => book.id === id)
        return boolean
    }
    return (
        <div>
            <button onClick={handleOnClick} 
            style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "5px",
                border: "1px grey solid",
                borderRadius: "5px",
                backgroundColor: "white"
            }}>
            <label>
                <input type="radio" 
                name="save" 
                style={{display: "none",
                    
                }}
                 />
                 <FaHeart style={{
                    margin: "3px"
                }} size={20} color={favouritesChecker(book.id) ? "red" : "grey"} />
            </label>
             <span style={{
                fontSize: "12px",
                color: "black"

             }} >{favouritesChecker(book.id) ? "Remove From Favourites" : "Add To Favourites"}</span>
            </button>
            
        </div>
    )

})

export default Favourite