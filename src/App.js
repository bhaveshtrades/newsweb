import React from "react";
import News from './components/News';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";


function App(){ 

  News.defaultProps = {
    newsCountry: "in",
    newsCategory: "general",
    newsNumber: 12
  }
  
  News.propTypes = {
    newsNumber: PropTypes.number,
    newsCategory: PropTypes.string
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<News key="general" newsCategory="general"></News>}></Route>
        <Route exact path="/general" element={<News key="general" newsCategory="general"></News>}></Route>
        <Route exact path="/sports" element={<News key="sports" newsCategory="sports"></News>}></Route>
        <Route exact path="/science" element={<News key="science" newsCategory="science"></News>}></Route>
        <Route exact path="/technology" element={<News key="technology" newsCategory="technology"></News>}></Route>
        <Route exact path="/health" element={<News key="health" newsCategory="health"></News>}></Route>
        <Route exact path="/business" element={<News key="business" newsCategory="business"></News>}></Route>
        <Route exact path="/politics" element={<News key="politics" newsCategory="politics"></News>}></Route>
        <Route exact path="/entertainment" element={<News key="entertainment" newsCategory="entertainment"></News>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App; 
