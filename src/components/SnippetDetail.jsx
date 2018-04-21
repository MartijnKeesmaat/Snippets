import React from 'react';

class SnippetDetail extends React.Component {
  render() {
    const snippets = this.props.snippets;
    const asn = this.props.activeSnippet;
    {
      if (this.props.snippets.length > 0) {
        return (
          <div className="main-content__inner main-content__inner--detail">
            <h4>{snippets[asn].title}</h4>
            <p>{snippets[asn].description}</p>
            <p>{snippets[asn].files[0]}</p>
            <small>{snippets[asn].dateCreated}</small>
          </div>
        );
      }
      return (
        <div className="main-content__inner main-content__inner--detail">
          <p>Loading..</p>
        </div>
      );
    }
  }
}

export default SnippetDetail;
