import React from 'react';

class SnippetDetail extends React.Component {
  render() {
    const snippets = this.props.snippets;
    {
      if (this.props.snippets.length > 0) {
        return (
          <div className="main-content__inner main-content__inner--detail">
            <h4>{snippets[0].title}</h4>
            <p>{snippets[0].description}</p>
            <small>{snippets[0].dateCreated}</small>
          </div>
        );
      }
      return (
        <div className="main-content__inner main-content__inner--detail">
          {' '}
          <p>Loading..</p>{' '}
        </div>
      );
    }
  }
}

export default SnippetDetail;
