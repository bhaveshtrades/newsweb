import React from "react";
import {
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
import './App.css';
import AppRoute from "./Router/AppRoute";

function App(){

  return (
    <>
    <BrowserRouter basename="/newsweb">
    <Routes>
     <Route exact path='*' element={<AppRoute/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
