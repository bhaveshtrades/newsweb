import React, {useEffect, useState} from "react";
import NewsItem from './NewsItem';
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import './style.css';


function App({newsCountry, newsNumber, newsCategory}){ 

  const[data, setData] = useState([]);
  const[page, setPage] = useState(1);
  const[spinner, setSpinner] = useState(false);
  const[searchWord, setSearchWord] = useState();
  const[searching, setSearching] = useState(false);
  const[totalResults, setTotalResults] = useState();

  const handlePrevPage = ()=>{
    setPage(page - 1);
  }

  const enteredTitle = (e)=>{
    setSearchWord(e.target.value.toLowerCase());
    setSearching(true);
  }

  const filteredData = data.filter((value)=>{
    if(searchWord === ''){
      return value;
    }else{
      return value.title.toLowerCase().includes(searchWord);
    }
  })

  const handleNextPage = ()=>{
    setPage(page + 1);
  }

  let mainURL = `https://newsapi.org/v2/top-headlines?country=${newsCountry}&category=${newsCategory}&apiKey=8e550363720d4718a59c1e803cd6124f&page=${page}&pageSize=${newsNumber}`;

  useEffect(()=>{
    setSpinner(true);
    fetch(mainURL).then(data => data.json())
    .then((response) => {setData(response.articles);
                         setTotalResults(response.totalResults)
                         setSpinner(false)
                         });
  }, [mainURL]); 

  console.log(totalResults);

  return(
    <>  
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav gap-x-4 text-yellow-50">
      <NavLink to="/general">General</NavLink>
      <NavLink to ="/sports">Sports</NavLink>
      <NavLink to ="/science">Science</NavLink>
      <NavLink to ="/technology">Technology</NavLink>
      <NavLink to ="/health">Health</NavLink>
      <NavLink to ="/business">Business</NavLink>
      <NavLink to ="/politics">Politics</NavLink>
      <NavLink to ="/entertainment">Entertainment</NavLink>
      </div>
    </div>
    </div>
    <form className = "d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={enteredTitle}/>
      </form> 
    </nav>
    <h1 className="text-center text-5xl my-5"><b>News For You</b></h1>
    <div className="container my-3">
      {spinner && <div className="flex justify-center"><Loading></Loading></div>}
     <div className="row gap-x-14 gap-y-4 justify-center">
      {(!spinner && !searching) && data.map((element, index)=>(
    <NewsItem key={index} newsSource={element.source.name} newsDescription={element.description} newsTitle={element.title} imageURL={element.urlToImage} newsURL={element.url}/>))}  
      {(!spinner && searching) && filteredData.map((element, index)=>(
        <NewsItem key={index} newsSource={element.source.name} newsDescription={element.description} newsTitle={element.title} imageURL={element.urlToImage} newsURL={element.url}/>))
        }
    </div>
    </div>
    {!spinner && <div className="d-flex justify-content-end gap-x-4 pr-3 pb-5">
    {(page>1) && <button type="button" className="btn btn-dark bg-dark" onClick={handlePrevPage}>Previous</button>}
    {(page + 1 <= Math.ceil(totalResults/newsNumber)) && <button type="button" className="btn btn-dark bg-dark" onClick={handleNextPage}>Next</button>}
    </div>}
    </>
  );
}

export default App; 
