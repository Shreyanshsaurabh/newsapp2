import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './fullarticle.css'; 
const FullArticle = ({ article, onClose }) => {
  const [fullContent, setFullContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFullArticle = async () => {
      if (!article.url) return;

      setIsLoading(true);
      setError('');

      try {
        const response = await axios.post('http://localhost:4000/scrape', {
          url: article.url,
        });
        setFullContent(response.data.content);
      } catch (err) {
        setError('Failed to load the full article. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullArticle();
  }, [article.url]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{article.title}</h2>
        {isLoading && <p>Loading full article...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && <div className="article-body">{fullContent}</div>}
      </div>
    </div>
  );
};

export default FullArticle;
