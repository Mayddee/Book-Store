import React, { useState, useContext, useMemo } from "react";
import { FaStar } from "react-icons/fa"
import { myContext } from "../App";
import useLocalStorage from "use-local-storage";

const StarRate = ({rating, card}) => {
    const [userRating, setUserRating] = useLocalStorage(null)
    const [hover, setHover] = useState(null)
    const {cards, isDark} = useContext(myContext)
    const index = useMemo(()=> card.id - 1, [JSON.stringify(card)])
    const roundedRating = rating
    // const roundedRating = Math.round(rating * 2) / 2

    return (
        <>
        {[...Array(5)].map((star, index) => {
            const currentRate = index + 1
            return (
                // <>
                <label>
                    <input type="radio" 
                name="rating" 
                // value={currentRate} 
                onClick={() => setUserRating(currentRate)}
                
                style={{display: "none"}}
                />
                <FaStar size={30} color={ currentRate <= (hover || roundedRating) ? (!isDark ? "yellow" : "blue") : "grey" }  
                onMouseOver={() => setHover(currentRate)}
                onMouseOut={() => 
                    setHover(null)}
                    // setHover(null)}
              style={{
                clipPath:
                  currentRate === Math.ceil(roundedRating) &&
                  !Number.isInteger(roundedRating)
                    ? `inset(0 ${100 - (roundedRating % 1) * 100}% 0 0)`
                    : "none",
              }}
                
                />
                
                </label>
                // </>
                
            ) 
        })}
        </>
    )
}

export default StarRate;