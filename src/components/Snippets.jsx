import React from 'react';
import Snippet from './Snippet';

class Snippets extends React.Component {
  setFavs = () => {
    const snippets = this.props.snippets;
    const favs = [];

    var found = false;
    for (var i = 0; i < snippets.length; i++) {
      if (snippets[i].favorite === true) {
        favs.push(snippets[i]);
      }
    }
    console.log(favs);
  };

  componentDidMount() {
    if (this.props.snippets) {
      this.setFavs();
    }
  }

  render() {
    const snippets = this.props.snippets;

    return (
      <div className="main-content__inner main-content__inner--snippets">
        <div className="main-content__inner--snippets--child">
          {this.props.snippets.length > 0 &&
            snippets.map((snippet, key) => (
              <Snippet
                key={key}
                index={key}
                details={this.props.snippets[key]}
                showSnippetDetail={this.props.showSnippetDetail}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Snippets;
