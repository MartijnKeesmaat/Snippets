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
