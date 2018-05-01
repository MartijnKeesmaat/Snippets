import React from 'react';
import Snippet from './Snippet';

class Snippets extends React.Component {
  render() {
    return (
      <div className="main-content__inner main-content__inner--snippets">
        <div className="scroll-container">
          {this.props.snippets.length > 0 &&
            this.props.snippets.map((snippet, key) => (
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
