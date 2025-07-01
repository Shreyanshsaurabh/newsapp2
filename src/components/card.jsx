import React from 'react';
import './card.css';

function Card({ title, image, description,author,publishedAt,url,onReadMore }) {
  return (
    <div className="movie-card">
      {image && <img className="image" src={image} alt={title} />}
      <div className="movie-info">
        <h2>{title}</h2>
        <br></br>
        <p className="author">{author} {publishedAt}</p>
        <p className="description">{description}</p>
         <button>
        <a className='readmore' onClick={onReadMore}>Read More</a>
        </button>
      </div>
    </div>
  );
}

export default Card;
