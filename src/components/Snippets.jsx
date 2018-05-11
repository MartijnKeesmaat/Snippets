import React from 'react';
import Snippet from './Snippet';

class Snippets extends React.Component {
  render() {
    if (!this.props.isLoading && this.props.hasSnippets) {
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
                />
              ))}
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default Snippets;
