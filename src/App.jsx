import React, { Component } from 'react';
import base from '../src/initFirebase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Snippets from './components/Snippets';
import SnippetDetail from './components/SnippetDetail';
import sampleSnippets from './sampleSnippets';

class App extends Component {
  state = {
    snippets: [],
    activeSnippet: 0
  };

  componentDidMount() {
    // const { params } = this.props.match;
    // const localStorageRef = localStorage.getItem(params);
    // if (localStorage) {
    //   this.setState({ order: JSON.parse(localStorageRef) });
    // }
    this.ref = base.syncState('snippets', {
      context: this,
      state: 'snippets'
    });
  }

  addSnippet = snippet => {
    // 1. take a copy of existing state
    const snippets = [...this.state.snippets];
    // 2. add new snippet to snippets arr
    snippets.push(snippet);
    // Set new snippets to state
    this.setState({
      snippets
    });
  };

  loadSampleSnippets = () => {
    this.setState({
      snippets: sampleSnippets
    });
    console.log(sampleSnippets);
    console.log(this.state.snippets);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <Sidebar addSnippet={this.addSnippet} />
          <Snippets
            snippets={this.state.snippets}
            loadSampleSnippets={this.loadSampleSnippets}
          />
          <SnippetDetail snippets={this.state.snippets} />
        </main>
      </div>
    );
  }
}

export default App;
