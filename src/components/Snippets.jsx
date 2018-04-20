import React from 'react';

class Snippets extends React.Component {
  render() {
    return (
      <div className="main-content__inner main-content__inner--snippets">
        <h3>Snippets</h3>
        <button className="btn" onClick={this.props.loadSampleSnippets}>
          Add sample snippets
        </button>
        {this.props.snippets.map((snippet, key) => (
          <div key={key}>
            <h4>{snippet.title}</h4>
            <p>{snippet.description}</p>
            <small>{snippet.dateCreated}</small>
          </div>
        ))}
      </div>
    );
  }
}

export default Snippets;
