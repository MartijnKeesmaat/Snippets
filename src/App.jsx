import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Snippets from './components/Snippets';
import SnippetDetail from './components/SnippetDetail';

class App extends Component {
  state = {
    snippets: {}
  };
  render() {
    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <Sidebar />
          <Snippets />
          <SnippetDetail />
        </main>
      </div>
    );
  }
}

export default App;
