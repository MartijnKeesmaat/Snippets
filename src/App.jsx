import React, { Component } from 'react';
import base from '../src/initFirebase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Snippets from './components/Snippets';
import SnippetDetail from './components/SnippetDetail';

class App extends Component {
  state = {
    snippets: [],
    initialSnippets: [],
    filterSnippets: [],
    activeSnippet: 0,
    visible: false
  };

  waitForSnippets = input => {
    base.listenTo('snippets', {
      context: this,
      asArray: true,
      then() {
        var here = this;
        var delay = (function() {
          var timer = 0;
          return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
          };
        })();

        delay(function() {
          here.setState({
            initialSnippets: here.state.snippets
          });
        }, 1);
      }
    });
  };

  componentDidMount() {
    this.ref = base.syncState('snippets', {
      context: this,
      state: 'snippets'
    });
    this.waitForSnippets();
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

  searchSnippets = event => {
    let updatedList = this.state.initialSnippets;
    if (event.target.value.length == 0) {
      this.setState({ initialSnippets: this.state.snippets });
      return;
    }
    updatedList = updatedList.filter(snippet => {
      return (
        snippet.title.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.setState({ initialSnippets: updatedList });
  };

  setFavorite = snippetIndex => {
    let snippets = this.state.snippets;
    snippets[snippetIndex].favorite = !snippets[snippetIndex].favorite;
    this.setState({
      snippets
    });
  };

  showFavorites = () => {
    let updatedList = this.state.initialSnippets;
    updatedList = updatedList.filter(snippet => {
      return snippet.favorite === true;
    });
    this.setState({ initialSnippets: updatedList });
  };

  showAllSnippets = () => {
    this.setState({ initialSnippets: this.state.snippets });
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          addSnippet={this.addSnippet}
          openModal={this.openModal}
          closeModal={this.closeModal}
          visible={this.state.visible}
          showFavorites={this.showFavorites}
          showAllSnippets={this.showAllSnippets}
        />
        <div className="nav-content">
          <Header searchSnippets={this.searchSnippets} />
          <main className="main-content">
            <Snippets
              snippets={this.state.snippets}
              initialSnippets={this.state.initialSnippets}
              showSnippetDetail={this.showSnippetDetail}
            />
            <SnippetDetail
              snippets={this.state.snippets}
              activeSnippet={this.state.activeSnippet}
              getFav={this.getFav}
              setFavorite={this.setFavorite}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
