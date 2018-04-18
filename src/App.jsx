import React, { Component } from 'react';
import Header from './components/Header';
// import './App.css';

class App extends Component {
  state = {
    snippets: {}
  };
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
