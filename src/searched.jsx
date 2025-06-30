import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './articles.css';
import Navbar from './components/navbar';
import Card from './components/card';

const Searched = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null); 
  const { searchQuery } = useParams();

  useEffect(() => {
    setError(null);
    fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=da51aa1c9e214821a6cfc7ade4710737`)
      .then(res => res.json())
      .then(data => {
        if (!data.articles || data.articles.length === 0) {
          setError("No articles found.");
          setArticles([]);
        } else {
          setArticles(data.articles);
        }
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles.");
      });
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <h1 className='heading'>
        {searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Articles
      </h1>

      <div className='container'>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          articles.map((article, index) => (
            <Card
              key={index}
              title={article.title}
              description={article.description}
              image={article.urlToImage}
              author={article.author}
              publishedAt={article.publishedAt}
              url={article.url}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Searched;
