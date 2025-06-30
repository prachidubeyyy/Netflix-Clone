import React, { useEffect, useState } from 'react';
import './Player.css';
import { useParams, useNavigate } from 'react-router-dom';
import back_arrow_icon from '../../assets/back_arrow_icon.png';


const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No movie ID provided");
      return;
    }

  
    const api_key = '26446d2c98d905b395b6d84fef5ab8f9';

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${api_key}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const trailer =
          res.results.find(
            (video) =>
              video.site === 'YouTube' &&
              video.type === 'Trailer' &&
              video.official === true
          ) ||
          res.results.find((video) => video.site === 'YouTube');

        if (trailer) {
          setVideoKey(trailer.key);
        } else {
          setError("No suitable trailer found.");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load trailer.");
      });
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        onClick={() => navigate(-1)}
        alt="Back"
        className="back-arrow"
      />

      {videoKey ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: 'white', fontSize: '18px' }}>
          {error || 'Loading trailer...'}
        </p>
      )}
    </div>
  );
};

export default Player;
