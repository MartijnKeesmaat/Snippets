import React from 'react';
import Snippet from './Snippet';

class Snippets extends React.Component {
  render() {
    if (
      !this.props.isLoading &&
      this.props.hasSnippets &&
      this.props.hasInitialSnippets &&
      this.props.initialSnippets &&
      this.props.initialSnippets.length > 0
    ) {
      return (
        <div className="main-content__inner main-content__inner--snippets">
          <div className="scroll-container">
            {this.props.initialSnippets.length > 0 &&
              this.props.initialSnippets.map((snippet, key) => (
                <Snippet
                  key={key}
                  index={key}
                  details={this.props.initialSnippets[key]}
                  showSnippetDetail={this.props.showSnippetDetail}
                  activeSnippet={this.props.activeSnippet}
                />
              ))}
          </div>
        </div>
      );
    } else if (
      !this.props.hasSnippets &&
      !this.props.hasSnippets &&
      this.props.isLoading
    ) {
      return '';
    } else {
      return (
        <div className="main-content__inner main-content__inner--snippets">
          <div className="scroll-container">
            <p>No snippets found</p>
          </div>
        </div>
      );
    }
  }
}

export default Snippets;
