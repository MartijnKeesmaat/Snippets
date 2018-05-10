import React, { Component } from 'react';
import firebase from 'firebase';
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
    allSnippets: [],
    snippets: [],
    initialSnippets: [],
    filterSnippets: [],
    activeSnippet: 0,
    languages: [],
    visible: false,
    labels: [],
    authenticated: false,
    isLoggedIn: false
  };

  /***** 
    --- SIDEBAR ---
  *****/
  addLabel = labelName => {
    let labels = this.state.labels;
    labels.push(labelName);
    this.setState({
      labels
    });
  };

  filterLanguage = e => {
    this.setState({
      activeSnippet: 0
    });
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

  getAllLanguages = () => {
    let allLangs = [];
    let filteredLangs = [];

    // get every value and spread it in a new arr
    for (let i = 0; i < this.state.snippets.length; i++) {
      allLangs.push(...this.state.snippets[i].languages);
    }
    // rm duplicates from combined arr
    filteredLangs = removeDuplicates(allLangs);
    this.setState({ languages: filteredLangs });
  };

  filterLabel = () => {
    toast("Doesn't work yet :(", { autoClose: 3000 });
  };

  /***** 
    --- MODAL ---
  *****/
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

  /***** 
    --- FIREBASE ---
  *****/
  syncFirebase = () => {
    const here = this;
    if (firebase.auth().currentUser) {
      const userId = firebase.auth().currentUser.uid;
      here.setState({
        isLoggedIn: true
      });
      this.ref = base.syncState(`users/${userId}/snippets`, {
        context: this,
        state: 'snippets'
      });
      base.syncState(`users/${userId}/labels`, {
        context: this,
        state: 'labels',
        asArray: true
      });
    }
  };

  waitForSnippets = input => {
    const userId = firebase.auth().currentUser.uid;
    base.listenTo(`users/${userId}/snippets`, {
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
          here.getAllLanguages();
        }, 1);
      }
    });
  };

  authChange = () => {
    const here = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        here.syncFirebase();
        if (user.providerData[0].displayName) {
          const name = user.providerData[0].displayName;
          toast('Hi ' + name, { autoClose: 3000 });
        }
      }
    });
  };

  authHandler = async authData => {
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
    }, 2000);
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  signOut = () => {
    firebase.auth().signOut();
    toast('Logged out :(', { autoClose: 3000 });
    window.location.reload();
  };

  /***** 
    --- SNIPPET ---
  *****/
  addSnippet = snippet => {
    const snippets = [...this.state.snippets];
    snippets.unshift(snippet);
    this.setState({
      snippets,
      initialSnippets: snippets
    });

    this.syncFirebase();
    this.closeModal();
    toast(snippet.title + ' is added', { autoClose: 3000 });
  };

  deleteSnippet = key => {
    const initialSnippets = this.state.initialSnippets;
    toast(this.state.snippets[key].title + ' is removed', { autoClose: 3000 });
    initialSnippets.splice(key, 1);
    this.setState({
      initialSnippets,
      snippets: initialSnippets
    });
  };

  showSnippetDetail = key => {
    this.setState({
      activeSnippet: key
    });
  };

  editSnippet = () => {
    toast("Doesn't work yet :(", { autoClose: 3000 });
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

  /***** 
    --- REACT ---
  *****/
  componentDidMount() {
    var here = this;
    var delay = (function() {
      var timer = 0;
      return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();

    delay(function() {
      here.syncFirebase();
      here.waitForSnippets();
    }, 2000);
    this.authChange();
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
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
          filterLabel={this.filterLabel}
        />
        <div className="nav-content">
          <Header
            searchSnippets={this.searchSnippets}
            authenticated={this.state.authenticated}
            authenticate={this.authenticate}
            signOut={this.signOut}
            isLoggedIn={this.state.isLoggedIn}
          />
          <main className="main-content">
            <Snippets
              snippets={this.state.snippets}
              initialSnippets={this.state.initialSnippets}
              showSnippetDetail={this.showSnippetDetail}
              labels={this.state.labels}
            />
            <SnippetDetail
              snippets={this.state.snippets}
              initialSnippets={this.state.initialSnippets}
              activeSnippet={this.state.activeSnippet}
              getFav={this.getFav}
              setFavorite={this.setFavorite}
              labels={this.state.labels}
              deleteSnippet={this.deleteSnippet}
              editSnippet={this.editSnippet}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
