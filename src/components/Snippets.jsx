import React from 'react';
import Snippet from './Snippet';

class Snippets extends React.Component {
  render() {
    return (
      <div className="main-content__inner main-content__inner--snippets">
        <h3>Snippets</h3>
        {this.props.snippets.length > 0 &&
          this.props.snippets.map((snippet, key) => (
            <Snippet
              key={key}
              index={key}
              details={this.props.snippets[key]}
              showSnippetDetail={this.props.showSnippetDetail}
            />
          ))}

        {/* <button className="btn" onClick={this.props.loadSampleSnippets}>
          Add sample snippets
        </button> */}
      </div>
    );
  }
}

export default Snippets;
