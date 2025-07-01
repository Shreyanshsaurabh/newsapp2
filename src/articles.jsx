// src/articles.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullArticle from './fullarticle';
import Navbar from './components/navbar';
import Card from './components/card';

import './articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    setIsLoading(true); 
    setError(null);
    
   const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'error') {
          setError(data.message);
          setArticles([]);
        } else if (!data.articles || data.articles.length === 0) {
          setError("No articles found for this category.");
          setArticles([]);
        } else {
          setArticles(data.articles);
        }
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please check your network connection.");
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, [category]);

  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div>
      <Navbar />
      <h1 className='heading'>{category.charAt(0).toUpperCase() + category.slice(1)} Articles</h1>
      {isLoading && <p className="status-message">Loading articles...</p>}
      {error && <p className="status-message error">{error}</p>}
      
      <div className='container'>
        {!isLoading && !error && articles.map((article) => (
          <Card
            key={article.url} 
            title={article.title}
            description={article.description}
            image={article.urlToImage}
            url={article.url}
            onReadMore={() => handleReadMore(article)}
          />
        ))}
      </div>

      {selectedArticle && (
        <FullArticle article={selectedArticle} onClose={handleCloseArticle} />
      )}
    </div>
  );
};

export default Articles;
