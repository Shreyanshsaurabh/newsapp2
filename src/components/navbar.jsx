import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = (e) => {
    e.preventDefault(); // prevent form reload
    if (searchQuery.trim()) {
      navigate(`/searched/${searchQuery}`);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <img className='logo' alt='logo' src='/pngegg.png' />
        <ul className="nav-list">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/mysummary'>My Summaries</Link></li>
        </ul>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for articles..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;
