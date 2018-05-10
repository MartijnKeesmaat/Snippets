import React from 'react';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/theme/tomorrow';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const defaultValue = '';

class SnippetDetail extends React.Component {
  state = {
    value: defaultValue,
    theme: 'tomorrow',
    mode: 'jsx',
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: true,
    highlightActiveLine: true,
    enableSnippets: false,
    showLineNumbers: true,
    copied: false
  };

  addLabel = e => {
    const labelArr = this.props.snippets[this.props.activeSnippet].labels;
    const selectedOption = e.target.options[
      e.target.options.selectedIndex
    ].text.toLowerCase();

    labelArr.push(selectedOption);

    this.setState({});
  };

  copyCode = () => {
    this.setState({ copied: true });
    var here = this;
    var delay = (function() {
      var timer = 0;
      return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();

    delay(function() {
      here.setState({ copied: false });
    }, 3000);
  };

  render() {
    const snippets = this.props.initialSnippets;
    const snippetIndex = this.props.activeSnippet;
    // const labelArr = this.props.snippets[this.props.activeSnippet].labels;
    const labelArr = [];

    if (this.props.initialSnippets.length > 0) {
      this.state.value = snippets[snippetIndex].files[0];
      return (
        <div className="main-content__inner main-content__inner--detail snippet-detail">
          <div className="scroll-container">
            <div className="snippet-detail__top-bar">
              <div className="snippet-detail__time">
                <span className="snippet-detail__time__created">Created</span>
                <span className="snippet-detail__time__fill">
                  {snippets[snippetIndex].dateCreated} -
                  {snippets[snippetIndex].timeCreated}
                </span>
              </div>

              <div className="snippet-detail__controls">
                <img
                  onClick={this.props.editSnippet}
                  src={require('../icons/edit.svg')}
                  alt=""
                />
                <img
                  onClick={() => this.props.deleteSnippet(snippetIndex)}
                  src={require('../icons/trash.svg')}
                  alt=""
                />
              </div>
            </div>

            <h2>{snippets[snippetIndex].title}</h2>
            <p className="snippet-detail__desc">
              {snippets[snippetIndex].description}
            </p>

            <div className="snippet-detail__label-bar">
              <div className="snippet__labels">
                {snippets[snippetIndex].favorite && (
                  <div className="card snippet__label snippet__label--fav">
                    Favorite
                  </div>
                )}

                {labelArr.map((label, key) => (
                  <option value={label} key={key}>
                    {label}
                  </option>
                ))}
                <div className="card snippet__label">Docs</div>
                <div className="card snippet__label">Very nice</div>
              </div>

              <div className="snippet-detail__label-bar__control">
                {snippets[snippetIndex].favorite && (
                  <img
                    onClick={() => this.props.setFavorite(snippetIndex)}
                    src={require('../icons/fav.svg')}
                    alt=""
                  />
                )}
                {!snippets[snippetIndex].favorite && (
                  <img
                    onClick={() => this.props.setFavorite(snippetIndex)}
                    src={require('../icons/fav-empty.svg')}
                    alt=""
                  />
                )}
                <select
                  onClick={this.props.editSnippet}
                  onChange={this.addLabel}
                >
                  <option selected disabled value="label">
                    Labels
                  </option>

                  {this.props.labels.map((label, key) => (
                    <option value={label} key={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr />

            {snippets[snippetIndex].files.map((key, index) => (
              <div className="editor-detail card" key={index}>
                <div className="editor-detail__top">
                  <p className="editor-detail__top__lang">
                    {snippets[snippetIndex].languages[index]}
                  </p>

                  <CopyToClipboard
                    text={snippets[snippetIndex].files[index]}
                    onCopy={() => this.copyCode()}
                  >
                    <button className="editor-detail__copy">
                      {this.state.copied ? (
                        <span className={'copied'}>Copied</span>
                      ) : (
                        <span>Copy code</span>
                      )}
                    </button>
                  </CopyToClipboard>
                </div>
                <AceEditor
                  mode={this.state.mode}
                  theme={this.state.theme}
                  editorProps={{ $blockScrolling: Infinity }}
                  onValidate={this.onValidate}
                  value={snippets[snippetIndex].files[index]}
                  fontSize={this.state.fontSize}
                  showPrintMargin={this.state.showPrintMargin}
                  showGutter={this.state.showGutter}
                  height={'300px'}
                  width={'100%'}
                  highlightActiveLine={this.state.highlightActiveLine}
                  readOnly={true}
                  setOptions={{
                    enableBasicAutocompletion: this.state
                      .enableBasicAutocompletion,
                    enableLiveAutocompletion: this.state
                      .enableLiveAutocompletion,
                    enableSnippets: this.state.enableSnippets,
                    showLineNumbers: this.state.showLineNumbers,
                    tabSize: 2
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="main-content__inner main-content__inner--detail">
        <img
          src="http://4.bp.blogspot.com/-jpc1AQcAQgs/VC5cvqiykgI/AAAAAAAAMwE/r8lj3LcIvh8/s1600/15-10%2B~%2BGIF%2B~%2BPlease%2BWait.gif"
          alt="Loading"
          className="loader"
        />
      </div>
    );
  }
}

export default SnippetDetail;
