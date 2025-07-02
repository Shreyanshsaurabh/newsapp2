// src/FullArticle.jsx

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
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:10000';
        const response = await axios.post(`${backendUrl}/scrape`, {
          url: article.url,
        });

        if (response.data?.content) {
          setFullContent(response.data.content);
        } else {
          setError('No content returned from server.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load the full article. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullArticle();
  }, [article.url]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{article.title}</h2>
        {isLoading && <p>Loading full article...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && fullContent && (
          <div className="article-body">{fullContent}</div>
        )}
      </div>
    </div>
  );
};

export default FullArticle;
