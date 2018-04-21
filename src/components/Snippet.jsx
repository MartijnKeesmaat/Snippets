import React from 'react';

class Snippets extends React.Component {
  render() {
    const details = this.props.details;
    return (
      <div className="snippet">
        <h4>{details.title}</h4>
        <p>{details.description}</p>
        <small>{details.dateCreated}</small>
      </div>
    );
  }
}

export default Snippets;
