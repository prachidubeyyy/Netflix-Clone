import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQ0NmQyYzk4ZDkwNWIzOTViNmQ4NGZlZjVhYjhmOSIsIm5iZiI6MTc1MTA5ODM1NC43MTYsInN1YiI6IjY4NWZhM2YyZDA1MjRhYjU3NGRlYmMyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FfPpE1cqM6VrRs5Fi8_jl909fECuhOcFuccM2-IW1gk'
  }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setApiData(res.results || []);
      })
      .catch((err) => console.error("API Fetch Error:", err));

    const refCurrent = cardsRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) =>
          card.backdrop_path && card.id ? (
            <Link to={`/player/${card.id}`} className="card" key={card.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.title || card.name || "Netflix Video"}
              />
              <p>{card.title || card.name || "Untitled"}</p>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TitleCards;
