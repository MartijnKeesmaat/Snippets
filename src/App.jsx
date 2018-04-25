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
    activeSnippet: 0,
    visible: true
  };

  componentDidMount() {
    this.ref = base.syncState('snippets', {
      context: this,
      state: 'snippets'
    });
  }

  showSnippetDetail = key => {
    this.setState({
      activeSnippet: key
    });
  };

  addSnippet = snippet => {
    console.log(snippet);
    // 1. take a copy of existing state
    const snippets = [...this.state.snippets];
    // 2. add new snippet to snippets arr
    snippets.unshift(snippet);
    // Set new snippets to state
    this.setState({
      snippets
    });

    this.closeModal();
  };

  loadSampleSnippets = () => {
    this.setState({
      snippets: sampleSnippets
    });
  };

  openModal = () => {
    this.setState({
      visible: true
    });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <Sidebar
            addSnippet={this.addSnippet}
            openModal={this.openModal}
            closeModal={this.closeModal}
            visible={this.state.visible}
          />
          <Snippets
            snippets={this.state.snippets}
            loadSampleSnippets={this.loadSampleSnippets}
            showSnippetDetail={this.showSnippetDetail}
          />
          <SnippetDetail
            snippets={this.state.snippets}
            activeSnippet={this.state.activeSnippet}
          />
        </main>
      </div>
    );
  }
}

export default App;
