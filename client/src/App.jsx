import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Beerinfo from './pages/Beerinfo';
import Results from './pages/Results';
// import Searchbar from './components/Searchbar';
import Randombeer from './pages/Randombeer';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {/* <Route exact path="/" component={Home}></Route> */}
        <Route exact path="/" component={Results} />
        <Route exact path="/beers/:id" component={Beerinfo} />
        <Route exact path="/random" component={Randombeer} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
