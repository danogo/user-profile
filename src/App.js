import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faShareSquare, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import UserProfile from './components/UserProfile/UserProfile';
// including fa icons 
library.add(faTimes, faShareSquare, fasHeart, farHeart);

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserProfile/>
      </div>
    );
  }
}

export default App;
