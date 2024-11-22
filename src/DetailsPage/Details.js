import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import StarRate from "../StarRate/StarRate";
import './Details.css'; // Импортируем CSS файл
import { myContext } from "../App";

const Details = ({ card }) => {
    const location = useLocation();
    console.log(location);
    const {cards, isDark} = useContext(myContext)

    return (
        <div className="details-container">
            <div className="details-card">
                <img src={card.image_url} alt={card.title} className="details-image" />

                <div className="details-content">
                    <h1 className="details-title">{card.title}</h1>
                    <p className="details-rating">
                        <StarRate rating={card.rating} card={card} /> <span> {card.rating.toFixed(1)} / 5</span>
                    </p>
                    <p className="details-genre"><b>Жанры:</b> {card.genres}</p>
                    <p className="details-author"><b>Авторы:</b> {card.authors}</p>
                    <p className="details-description"><b>Описание:</b> {card.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Details;

