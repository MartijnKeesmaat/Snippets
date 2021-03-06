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
    labels: [],
    languages: [],
    activeSnippet: 0,
    visible: false,
    authenticated: false,
    isLoggedIn: false,
    isLoading: true,
    hasSnippets: false,
    hasInitialSnippets: false
  };

  /***** 
     FIREBASE 
  *****/

  // Sync snippets of current user
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

  // Set all statuses
  waitForSnippets = input => {
    if (firebase.auth().currentUser) {
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
            here.setState({ isLoading: false });
            here.setState({
              initialSnippets: here.state.snippets
            });
            here.hasSnippets();
            here.getAllLanguages();
          }, 1);
        }
      });
    }
  };

  // If user makes changes => sync
  authChange = () => {
    const here = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        here.syncFirebase();
      }
    });
  };

  // When user logges is
  authHandler = async authData => {
    var here = this;
    const name = firebase.auth().currentUser.displayName;
    if (!name) {
      toast('Hi ' + name, { autoClose: 3000 });
    }
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
     SIDEBAR 
  *****/
  // Make a copy of snippets & set hasSnippets status
  showAllSnippets = e => {
    this.setState({ initialSnippets: this.state.snippets });
    this.setActiveClass(e);
    this.hasSnippets();
  };

  // Adds label to the sidebar
  addLabel = labelName => {
    let labels = this.state.labels;
    labels.push(labelName);
    this.setState({
      labels
    });
  };

  // Set languages in sidebar
  getAllLanguages = () => {
    let allLangs = [];
    let filteredLangs = [];

    // get every value and spread it in a new arr
    for (let i = 0; i < this.state.snippets.length; i++) {
      if (
        this.state.snippets[i].languages &&
        this.state.snippets[i].languages !== ''
      ) {
        allLangs.push(...this.state.snippets[i].languages);
      }
    }
    filteredLangs = removeDuplicates(allLangs); // rm duplicates from combined arr
    this.setState({
      languages: filteredLangs
    });
  };

  // Adds class to clicked link in sidebar
  setActiveClass = e => {
    const selector = e.currentTarget;
    const all = document.querySelectorAll('.sidebar__link');
    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove('sidebar__link--active');
    }
    selector.classList.add('sidebar__link--active');
  };

  // Labels in a snippet
  setLabel = labelArr => {
    const snippets = this.state.snippets;
    snippets[this.state.activeSnippet].labels = labelArr;
    this.setState({
      snippets
    });
  };

  // Shows all snippets with corresponding language
  filterLanguage = e => {
    this.setState({ initialSnippets: this.state.snippets });
    this.setState({ activeSnippet: 0 });
    const clickedLang = e.target.textContent;
    let updatedList = this.state.snippets; //reset list when another is clicked
    updatedList = updatedList.filter(snippet => {
      if (snippet.languages) {
        return (
          //TODO clean this
          snippet.languages[0] === clickedLang ||
          snippet.languages[1] === clickedLang ||
          snippet.languages[2] === clickedLang ||
          snippet.languages[3] === clickedLang ||
          snippet.languages[4] === clickedLang ||
          snippet.languages[5] === clickedLang
        );
      }
    });
    this.setState({ initialSnippets: updatedList });
    this.setActiveClass(e);
    this.hasSnippets();
  };

  // Shows all snippets with corresponding label
  filterLabel = e => {
    this.setActiveClass(e);
    this.setState({ initialSnippets: this.state.snippets });

    const value = e.currentTarget.textContent.toLowerCase();
    let updatedList = this.state.snippets; //reset list when another is clicked
    updatedList = updatedList.filter(snippet => {
      return (
        //TODO clean this
        snippet.labels[0] === value ||
        snippet.labels[1] === value ||
        snippet.labels[2] === value ||
        snippet.labels[3] === value ||
        snippet.labels[4] === value ||
        snippet.labels[5] === value
      );
    });
    this.setState({
      activeSnippet: 0
    });
    this.setState({ initialSnippets: updatedList });
    this.hasSnippets();
  };

  // Shows all favorite snippets
  filterFavorites = e => {
    this.setState({
      activeSnippet: 0
    });
    this.setActiveClass(e);

    var here = this;
    var delay = (function() {
      var timer = 0;
      return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();

    delay(function() {
      here.setState({ initialSnippets: here.state.snippets }); // filter over all snippets
      let updatedList = here.state.initialSnippets;
      updatedList = updatedList.filter(snippet => {
        return snippet.favorite === true; // check if fav
      });
      here.setState({ initialSnippets: updatedList }); // update
    }, 1);
    this.hasSnippets();
  };

  /***** 
     MODAL 
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
     SNIPPET 
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
    this.getAllLanguages();
    toast(snippet.title + ' is added', { autoClose: 3000 });
    this.hasSnippets();
  };

  deleteSnippet = key => {
    const initialSnippets = this.state.initialSnippets;
    toast(this.state.snippets[key].title + ' is removed', { autoClose: 3000 });
    initialSnippets.splice(key, 1);
    this.setState({
      initialSnippets,
      snippets: initialSnippets
    });

    if (this.state.activeSnippet !== 0) {
      const activeSnippet = this.state.activeSnippet - 1;
      this.setState({ activeSnippet });
    }
    this.hasSnippets();
  };

  showSnippetDetail = key => {
    this.setState({
      activeSnippet: key
    });
  };

  editSnippet = (title, desc) => {
    const snippets = this.state.snippets;
    snippets[this.state.activeSnippet].title = title;
    snippets[this.state.activeSnippet].description = desc;
    this.setState({
      snippets
    });
  };

  setFavorite = snippetIndex => {
    let snippets = this.state.snippets;
    snippets[snippetIndex].favorite = !snippets[snippetIndex].favorite;
    this.setState({
      snippets
    });
  };

  searchSnippets = event => {
    let updatedList = this.state.initialSnippets;
    if (event.target.value.length === 0) {
      this.setState({ initialSnippets: this.state.snippets });
      return;
    }
    updatedList = updatedList.filter(snippet => {
      const title = snippet.title.toLowerCase();
      const desc = snippet.description.toLowerCase();
      const searchedValue = event.target.value.toLowerCase();
      return (
        title.search(searchedValue) !== -1 || desc.search(searchedValue) !== -1
      ); //search returns position if not found, -1
    });

    if (updatedList.length <= 1) {
      this.setState({ activeSnippet: 0 });
    }
    this.setState({ initialSnippets: updatedList });
  };

  /***** 
   Statusses / Stati ?? 
  *****/

  hasInitialSnippets = () => {
    var here = this;
    var delay = (function() {
      var timer = 0;
      return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();

    delay(function() {
      if (here.state.initialSnippets.length >= 1) {
        here.setState({ hasInitialSnippets: true });
      } else {
        here.setState({ hasInitialSnippets: false });
      }
    }, 1);
  };

  hasSnippets = () => {
    if (this.state.snippets.length > 0) {
      this.setState({ hasSnippets: true });
    } else {
      this.setState({ hasSnippets: false });
    }
    this.hasInitialSnippets();
  };

  /***** 
     Lifecycles
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
          filterFavorites={this.filterFavorites}
          showAllSnippets={this.showAllSnippets}
          initialSnippets={this.state.initialSnippets}
          languages={this.state.languages}
          filterLanguage={this.filterLanguage}
          labels={this.state.labels}
          addLabel={this.addLabel}
          filterLabel={this.filterLabel}
          isLoading={this.state.isLoading}
          hasSnippets={this.state.hasSnippets}
          hasInitialSnippets={this.state.hasInitialSnippets}
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
              isLoading={this.state.isLoading}
              hasSnippets={this.state.hasSnippets}
              activeSnippet={this.state.activeSnippet}
              hasInitialSnippets={this.state.hasInitialSnippets}
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
              setLabel={this.setLabel}
              isLoading={this.state.isLoading}
              hasSnippets={this.state.hasSnippets}
              hasInitialSnippets={this.state.hasInitialSnippets}
              closeModal={this.closeModal}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
