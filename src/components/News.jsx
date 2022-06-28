import React, {useEffect, useState} from "react";
import NewsItem from './NewsItem';
import Loading from "./Loading";
import { Link } from "react-router-dom";


function App({newsCountry, newsNumber, newsCategory}){ 

  const[data, setData] = useState([]);
  const[page, setPage] = useState(1);
  const[spinner, setSpinner] = useState(false);

  const handlePrevPage = ()=>{
    setPage(page - 1);
  }

  const handleNextPage = ()=>{
    setPage(page + 1);
  }

  let mainURL = `https://newsapi.org/v2/top-headlines?country=${newsCountry}&category=${newsCategory}&apiKey=8e550363720d4718a59c1e803cd6124f&page=${page}&pageSize=${newsNumber}`;

  useEffect(()=>{
    setSpinner(true);
    fetch(mainURL).then(data => data.json())
    .then((response) => {setData(response.articles)
                         setSpinner(false)});
  }, [mainURL, page]);



  return (
    <>  
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">News App</Link>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <button type="button" className="btn btn-dark"><Link to ="/">General</Link></button>
      <button type="button" className="btn btn-dark"><Link to ="/sports">Sports</Link></button>
      <button type="button" className="btn btn-dark"><Link to ="/science">Science</Link></button>
      <button type="button" className="btn btn-dark"><Link to ="/technology">Technology</Link></button>
      <button type="button" className="btn btn-dark"><Link to ="/health">Health</Link></button>
      <button type="button" className="btn btn-dark"><Link to ="/business">Business</Link></button>
      <button type="button" className="btn btn-dark"><Link to ="/politics">Politics</Link></button>
      <button type="button" className="btn btn-dark"><Link to ="/entertainment">Entertainment</Link></button>
      </div>
    </div>
    </div> 
    </nav>

    <h1 className="text-center text-5xl my-5"><b>News For You</b></h1>
    <div className="container my-3">
     <div className="row gap-x-14 gap-y-4 justify-center">
      {spinner && <div className="flex justify-center"><Loading></Loading></div>}
      {!spinner && data.map((element, index)=>(
        <NewsItem key={index} newsDescription={element.description} newsTitle={element.title} imageURL={element.urlToImage} newsURL={element.url}/>
      )
      )}
    </div>
    </div>
    {!spinner && <div className="d-flex justify-content-end gap-x-4 pr-3 pb-5">
    <button type="button" className="btn btn-dark bg-dark" onClick={handlePrevPage} disabled={page<=1}>Previous</button>
    <button type="button" className="btn btn-dark bg-dark" onClick={handleNextPage} disabled={data.length < newsNumber}>Next</button>
    </div>}
    </>
  );
}

export default App; 
