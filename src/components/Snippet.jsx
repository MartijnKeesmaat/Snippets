import React from 'react';

class Snippets extends React.Component {
  render() {
    const details = this.props.details;
    return (
      <div
        className={
          'snippet card ' +
          (this.props.activeSnippet === this.props.index
            ? 'snippet--active'
            : '')
        }
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
          {details.labels &&
            details.labels[0] !== '' &&
            details.labels.map((label, key) => (
              <div key={key} className="card snippet__label">
                {label}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Snippets;
