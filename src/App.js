import './App.css';
import React, { Component } from 'react';

import Movies from './components/movies';


class App extends Component {
  

  render() {
    console.log("App - Render");
    return (
      <main className='container'>
        <Movies />
      </main>
    );
  }

}

export default App;
