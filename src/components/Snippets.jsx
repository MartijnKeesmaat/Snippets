import React from 'react';
import Snippet from './Snippet';

class Snippets extends React.Component {
  state = {
    snippets: [],
    initialSnippets: [
      {
        dateCreated: '29/04/2018',
        description:
          'There is a moment in the life of any aspiring astr… think about setting up your own viewing station.',
        favorite: false,
        files: Array(2),
        timeCreated: '15:10:29',
        title: 'abc'
      },
      {
        dateCreated: '29/04/2018',
        description:
          'There is a moment in the life of any aspiring astr… think about setting up your own viewing station.',
        favorite: false,
        files: Array(2),
        timeCreated: '15:10:29',
        title: 'def'
      }
    ]
  };

  filterList = e => {
    let updatedList = this.state.initialSnippets;
    updatedList = updatedList.filter(snippet => {
      return (
        snippet.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ snippets: updatedList });
  };

  componentWillMount() {
    this.setState({ snippets: this.state.initialSnippets });
  }

  render() {
    return (
      <div className="main-content__inner main-content__inner--snippets">
        <div className="scroll-container">
          <input type="text" onChange={this.filterList} />
          {this.props.snippets.length > 0 &&
            this.state.snippets.map((snippet, key) => (
              <Snippet
                key={key}
                index={key}
                details={this.state.snippets[key]}
                showSnippetDetail={this.props.showSnippetDetail}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Snippets;
