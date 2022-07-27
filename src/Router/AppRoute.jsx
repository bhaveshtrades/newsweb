import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import News from '../components/News';
import PropTypes from 'prop-types';
import AuthRoute from './AuthRoute';

function AppRoute() {

    News.defaultProps = {
        newsCountry: "in",
        newsCategory: "general",
        newsNumber: 12
      }
      
      News.propTypes = {
        newsNumber: PropTypes.number,
        newsCategory: PropTypes.string
      }

    const[modeTxt, setModeTxt] = useState('Enable Dark Mode');
    const[hColor, setHColor] = useState('text-black');
    const[badgeColor, setBadgeColor] = useState('bg-dark');
    const[bodyColor, setBodyColor] = useState('bg-light');
    const[mode, setMode] = useState('bg-light');
  
    const toggleMode = ()=>{
      if(mode === 'bg-light'){
        setMode('bg-dark');
        setModeTxt('Enable Light Mode');
        setHColor('text-white');
        setBadgeColor('bg-danger');
        setBodyColor('bg-dark');
      }else{
        setMode('bg-light');
        setModeTxt('Enable Dark Mode');
        setMode('bg-light');
        setHColor('text-black');
        setBadgeColor('bg-dark');
        setBodyColor('bg-light');
      }
    } 

  return (
    <Routes>
    <Route exact path='*' element={<AuthRoute/>}/>
    <Route path='/news' element={<News key='general' newsCategory='general' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/general' element={<News key='general' newsCategory='general' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/sports' element={<News key='sports' newsCategory='sports' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/science' element={<News key='science' newsCategory='science' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/technology' element={<News key='technology'newsCategory='technology' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/health' element={<News key='health' newsCategory='health' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/business' element={<News key='business' newsCategory='business' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/politics' element={<News key='politics' newsCategory='politics' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
     <Route path='/news/entertainment' element={<News key='entertainment' newsCategory='entertainment' bodyColorProp={bodyColor} hColorProp={hColor} toggleModeProp={toggleMode} modeTxtProp={modeTxt} modeProp={mode} badgeColorProp={badgeColor} />}/>
   </Routes>
  )
}

export default AppRoute
