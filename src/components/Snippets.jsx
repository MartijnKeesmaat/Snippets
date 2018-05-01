import React from 'react';
import Snippet from './Snippet';
import base from '../../src/initFirebase';
import Rebase from 're-base';
import firebase from 'firebase';
import { waitForSnippets } from '../helpers';

class Snippets extends React.Component {
  state = {
    snippets: [],
    initialSnippets: [],
    here: this
  };

  filterList = e => {
    let updatedList = this.state.initialSnippets;
    updatedList = updatedList.filter(snippet => {
      return (
        snippet.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ snippets: updatedList });
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
            snippets: here.props.snippets,
            initialSnippets: here.props.snippets
          });
        }, 1);
      }
    });
  };

  componentDidMount() {
    this.waitForSnippets();
  }

  render() {
    return (
      <div className="main-content__inner main-content__inner--snippets">
        <div className="scroll-container">
          <input type="text" onChange={this.filterList} />
          {this.props.snippets.length > 0 &&
            this.state.snippets.map((snippet, key) => (
              <Snippet
                key={key}
                index={key}
                details={this.state.snippets[key]}
                showSnippetDetail={this.props.showSnippetDetail}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Snippets;
