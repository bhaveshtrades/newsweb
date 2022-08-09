import React, {useEffect, useState} from "react";
import NewsItem from './NewsItem';
import Loading from "./Loading";
import { NavLink, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/actions/actionCreators";

function App({newsCountry, newsCategory, newsNumber, bodyColorProp, modeProp ,hColorProp ,badgeColorProp, modeSwitchProp}){ 

  let dispatch = useDispatch();
  const {signOut} = bindActionCreators(actionCreators, dispatch)

  const[data, setData] = useState([]);
  const[loading, setLoading] = useState(true)
  const[barPrg, setBarPrg] = useState(0);
  const[page, setPage] = useState(1);
  const[searchWord, setSearchWord] = useState();
  const[searching, setSearching] = useState(false);
  const[totalResults, setTotalResults] = useState(0);

  document.body.className = `${bodyColorProp}`;

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 

  const apiKey = process.env.REACT_APP_API_KEY;

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

  document.title = `News - ${capitalizeFirstLetter(newsCategory)}`;

  const mainURL = `https://newsapi.org/v2/top-headlines?country=${newsCountry}&category=${newsCategory}&apiKey=${apiKey}&page=${page}&pageSize=${newsNumber}`;

  useEffect(()=>{
    setBarPrg(10);
    fetch(mainURL).then(data=>data.json())
    .then((response)=>{
       setData(response.articles);
       setTotalResults(response.totalResults)
       setLoading(false);
    })
    setBarPrg(100);
  }, []); 

  const fetchMoreData = ()=>{
    const mainURL = `https://newsapi.org/v2/top-headlines?country=${newsCountry}&category=${newsCategory}&apiKey=${apiKey}&page=${page+1}&pageSize=${newsNumber}`;
    fetch(mainURL).then((data)=>{setPage(page+1); return data.json()})
    .then((response)=>{
       setData(data.concat(response.articles));
       setTotalResults(response.totalResults);
    })
  }

  return(
    <div className={`${modeProp}`}> 
    <div>
      <LoadingBar
        color='#f11946'
        progress={barPrg}
        height={2}
        onLoaderFinished={() => setBarPrg(0)}
      />
    </div>
    <nav className="fixed-top navbar navbar-expand navbar-dark bg-dark">
    <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav gap-x-4 text-white">
      <NavLink to="/news/general">General</NavLink>
      <NavLink to ="/news/sports">Sports</NavLink>
      <NavLink to ="/news/science">Science</NavLink>
      <NavLink to ="/news/technology">Technology</NavLink>
      <NavLink to ="/news/health">Health</NavLink>
      <NavLink to ="/news/business">Business</NavLink>
      <NavLink to ="/news/politics">Politics</NavLink>
      <NavLink to ="/news/entertainment">Entertainment</NavLink>
      </div>
    </div> 
    {modeSwitchProp}
    </div>
    <form className = "d-flex mr-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Search News" aria-label="Search" onChange={enteredTitle}/>
        <Link to ='/signin'><button className="btn btn-outline-danger" type="submit" onClick={()=>dispatch(signOut)}>Logout</button></Link> 
      </form>
    </nav>
    <h1 className={`text-center text-5xl mt-20 ${hColorProp}`}><b>News For You</b></h1>
    {loading && <div className="flex justify-center mt-10"><Loading></Loading></div>}
    <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={data.length !== totalResults}
          loader={<div className="flex justify-center mb-3"><Loading></Loading></div>}
    >
    <div className="container my-3 mt-5">
      <div className="row gap-x-14 gap-y-4 justify-center">
      {!searching && data.map((element, index)=>(
       <NewsItem key={index} badgeColor={badgeColorProp} newsSource={element.source.name} newsDescription={element.description} newsTitle={element.title} imageURL={element.urlToImage} newsURL={element.url}/>))}
      {(searching) && filteredData.map((element, index)=>(
        <NewsItem key={index} badgeColor={badgeColorProp} newsSource={element.source.name} newsDescription={element.description} newsTitle={element.title} imageURL={element.urlToImage} newsURL={element.url}/>))
        }  
    </div>
    </div>
    </InfiniteScroll>
    </div>
  );
}

export default App; 
