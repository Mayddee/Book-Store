import React, { memo, useContext } from "react";

import { Card as AntdCard } from 'antd';
import { Button, Flex } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import './styles.css'; 
import { myContext } from "../App";
import Favourite from "../Favourite/Favourite";

const { Meta } = AntdCard;

const Card = memo(({ card, id }) => {
    const { cards, isDark } = useContext(myContext)

    const navigate = useNavigate()
    const { bookId } = useParams()


    return (
    <div className="card" dark-theme={ isDark ? "dark" : "light"} >
        <AntdCard hoverable style={{
            width: 240,
        }} cover={<img alt="card" src={card.image_url} />}>
            <Meta title={card.title} description={<div className="description">
                {card.description}
            </div> } />
            <p style={{
                marginTop: "10px"
            }} >Рейтинг: { card.rating }</p>
            <Button className="box" type="primary" style={{
                marginTop: "30px",
            }} onClick={() => navigate(`/catalog/${card.id}`)} >Show more...</Button>
            <Favourite id={card.id} book={card} />
            

        </AntdCard>
        
    </div>)
})

export default Card