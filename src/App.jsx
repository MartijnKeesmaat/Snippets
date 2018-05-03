import React, { Component } from 'react';
import base from '../src/initFirebase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Snippets from './components/Snippets';
import SnippetDetail from './components/SnippetDetail';
import { removeDuplicates } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    snippets: [],
    initialSnippets: [],
    filterSnippets: [],
    activeSnippet: 0,
    languages: [],
    visible: false,
    labels: ['test']
  };

  // wait for snippets to load
  waitForSnippets = input => {
    base.listenTo('snippets', {
      context: this,
      asArray: true,
      // still waiting..
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
          here.getAllLanguages();
        }, 1);
      }
    });
  };

  addLabel = labelName => {
    let labels = this.state.labels;
    labels.push(labelName);
    this.setState({
      labels
    });
  };

  getAllLanguages = () => {
    let allLangs = [];
    let filteredLangs = [];

    // get every value and spread it in a new arr
    for (let i = 0; i < this.state.snippets.length; i++) {
      allLangs.push(...this.state.snippets[i].languages);
    }
    // rm duplicates from combined arr
    filteredLangs = removeDuplicates(allLangs);
    // update state
    this.setState({ languages: filteredLangs });
  };

  componentDidMount() {
    this.ref = base.syncState('snippets', {
      context: this,
      state: 'snippets'
    });
    base.syncState(`labels`, {
      context: this,
      state: 'labels',
      asArray: true
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

  deleteSnippet = key => {
    const initialSnippets = this.state.initialSnippets;
    initialSnippets.splice(key, 1);
    this.setState({
      initialSnippets,
      snippets: initialSnippets
    });
  };

  searchSnippets = event => {
    let updatedList = this.state.initialSnippets;
    if (event.target.value.length === 0) {
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

  filterLanguage = e => {
    const clickedLang = e.target.textContent;
    let updatedList = this.state.snippets; //reset list when another is clicked
    updatedList = updatedList.filter(snippet => {
      return (
        //TODO clean this snippet.languages[0] === clickedLang ||
        snippet.languages[0] === clickedLang ||
        snippet.languages[1] === clickedLang ||
        snippet.languages[2] === clickedLang ||
        snippet.languages[3] === clickedLang ||
        snippet.languages[4] === clickedLang ||
        snippet.languages[5] === clickedLang
      );
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
          initialSnippets={this.state.initialSnippets}
          languages={this.state.languages}
          filterLanguage={this.filterLanguage}
          labels={this.state.labels}
          addLabel={this.addLabel}
        />
        <div className="nav-content">
          <Header searchSnippets={this.searchSnippets} />
          <main className="main-content">
            <Snippets
              snippets={this.state.snippets}
              initialSnippets={this.state.initialSnippets}
              showSnippetDetail={this.showSnippetDetail}
              labels={this.state.labels}
            />
            <SnippetDetail
              snippets={this.state.snippets}
              activeSnippet={this.state.activeSnippet}
              getFav={this.getFav}
              setFavorite={this.setFavorite}
              labels={this.state.labels}
              deleteSnippet={this.deleteSnippet}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
