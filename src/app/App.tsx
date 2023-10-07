import React from 'react';
import './style/index.scss'
import {MainPage} from "../pages/MainPage";
import {Route, Routes} from "react-router-dom";
import {DetailInfo} from "../pages/DetailInfo";

function App() {
  return (
    <>
        <Routes>
            <Route path={"/"} element={<MainPage/>}/>
            <Route path={"/detail/:id"} element={<DetailInfo/>}/>
        </Routes>

    </>
  );
}

export default App;
