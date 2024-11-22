import React, { useContext, useState, useEffect } from "react";
import StarRate from "../StarRate/StarRate";
import Favourite from "../Favourite/Favourite";
import { myContext } from "../App";
import "./Home.css"

const Home = () => {
    const { filteredByGenre} = useContext(myContext)
    const [currentSlide, setCurrentSlide] = useState(0);
    // console.log("Filtered by genre book in HOME: ", filteredByGenre)
    const itemsPerSlide = 3;

    // Переход к следующему слайду (сдвигаем на 3 элемента)
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredByGenre.length / itemsPerSlide));
    };
  
    // Переход к предыдущему слайду (сдвигаем на 3 элемента)
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredByGenre.length / itemsPerSlide)) % Math.ceil(filteredByGenre.length / itemsPerSlide));
    };
  
    // Автоматическое переключение слайдов через 3 секунды
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide(); // Переход к следующему слайду
      }, 3000); // 3 секунды интервал
  
      return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [filteredByGenre]);
  
    return (
      <div className="home">
        <div className="carousel-container">
          {/* Кнопки для управления каруселью */}
          <button onClick={prevSlide}>Previous</button>
          <div className="carousel">
            {/* Картинки и названия книг для текущего слайда */}
            <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }}>
              {filteredByGenre
                .slice(0, Math.ceil(filteredByGenre.length / itemsPerSlide) * itemsPerSlide) // Ограничиваем количество книг для отображения
                .map((book, index) => (
                  <div className="card" key={index}>
                    <img src={book.image_url} alt={book.title} />
                    <h2>{book.title}</h2>
                  </div>
                ))}
            </div>
          </div>
          <button onClick={nextSlide}>Next</button>
        </div>
      </div>
    )
  }

export default Home;