import React, { Component } from 'react';
import base from '../src/initFirebase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Snippets from './components/Snippets';
import SnippetDetail from './components/SnippetDetail';

class App extends Component {
  state = {
    snippets: [],
    activeSnippet: 0,
    visible: false
  };

  componentDidMount() {
    this.ref = base.syncState('snippets', {
      context: this,
      state: 'snippets'
    });
  }

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

  addSnippet = snippet => {
    console.log(snippet);
    console.log(snippet.files);
    const snippets = [...this.state.snippets];
    snippets.unshift(snippet);
    this.setState({
      snippets
    });

    this.closeModal();
  };

  showSnippetDetail = key => {
    this.setState({
      activeSnippet: key
    });
  };

  getFav = key => {
    this.state.snippets[key].favorite = !this.state.snippets[key].favorite;
    console.log(this.state.snippets[key]);
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          addSnippet={this.addSnippet}
          openModal={this.openModal}
          closeModal={this.closeModal}
          visible={this.state.visible}
        />
        <div className="nav-content">
          <Header />
          <main className="main-content">
            <Snippets
              snippets={this.state.snippets}
              loadSampleSnippets={this.loadSampleSnippets}
              showSnippetDetail={this.showSnippetDetail}
            />
            <SnippetDetail
              snippets={this.state.snippets}
              activeSnippet={this.state.activeSnippet}
              getFav={this.getFav}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
