import './App.css';
import React, { Component } from 'react';

import Movies from './components/movies';
import NavBar from './components/navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieDetail from './components/movieDetail';

class App extends Component {


  render() {
    console.log("App - Render");
    return (
      <main className='container'>
        <NavBar />
        <div className="content">
          <Switch>
            <Route path='/movies/:id' component={MovieDetail} />
            <Route path='/movies' component={Movies} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </main>
    );
  }

}

export default App;
