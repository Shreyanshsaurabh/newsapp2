import React from 'react';
import './App.css'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Mysummary from './mysummary';
import Card from './components/card';
import Articles from './articles';
import Searched from './searched';
import FullArticle from './fullarticle';
const Home = () => {
 return(
  
  <>
  <Navbar/>
  <h1 className='heading'>Categories</h1>
  <div className='category'>
  <Link to='/articles/technology'><Card title="Technology" image="/technology.jpg" /></Link>
<Link to='/articles/sports'><Card title="Sports" image="/sport.jpg" /></Link> 
<Link to='/articles/business'><Card title="Business" image="/business.jpg" /></Link>  
<Link to='/articles/politics'><Card title="Politics" image="/politics.png" /></Link> 
  </div>
  
  </>
 )
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/mysummary' element={<Mysummary/>}/>
         
        <Route path='/articles/:category' element={<Articles />} />
        <Route path='/searched/:searchQuery' element={<Searched />} />
      </Routes>
    </Router>
  );
};

export default App;