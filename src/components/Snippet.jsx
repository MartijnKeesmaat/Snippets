import React from 'react';

class Snippets extends React.Component {
  render() {
    const details = this.props.details;
    return (
      <div
        className="snippet card"
        onClick={() => this.props.showSnippetDetail(this.props.index)}
      >
        <h4>{details.title}</h4>
        <p>{details.description}</p>
        <div className="snippet__labels">
          {details.favorite && (
            <div className="card snippet__label snippet__label--fav">
              Favorite
            </div>
          )}
          {/* {labelArr.map((label, key) => (
            <div className="card snippet__label">Docs</div>
          ))} */}
        </div>
      </div>
    );
  }
}

export default Snippets;
