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

  setLabel = e => {
    const snippets = this.props.snippets;
    let labelArr = this.props.snippets[this.props.activeSnippet].labels;

    const selectedOption = e.target.options[
      e.target.options.selectedIndex
    ].text.toLowerCase();

    if (labelArr.indexOf(selectedOption) < 0) {
      labelArr.push(selectedOption);
    } else {
      labelArr.splice(labelArr.indexOf(selectedOption), 1);
    }

    if (labelArr.indexOf('') >= 0 && labelArr.length > 1) {
      labelArr.shift();
    } else if (labelArr.length === 0) {
      labelArr.push('');
    }

    this.props.setLabel(labelArr);
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

    if (!this.props.isLoading && this.props.hasSnippets) {
      if (snippets[snippetIndex].files) {
        this.state.value = snippets[snippetIndex].files[0];
      }
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

                {snippets[snippetIndex].labels &&
                  snippets[snippetIndex].labels[0] !== '' &&
                  snippets[snippetIndex].labels.map((label, key) => (
                    <div key={key} className="card snippet__label">
                      {label}
                    </div>
                  ))}
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
                  onChange={this.setLabel}
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

            {snippets[snippetIndex].files[0] !== '' &&
              snippets[snippetIndex].files.map((key, index) => (
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
    } else if (!this.props.hasSnippets && this.props.isLoading) {
      return (
        <div className="main-content__inner main-content__inner--detail loading-container">
          <img
            src="http://4.bp.blogspot.com/-jpc1AQcAQgs/VC5cvqiykgI/AAAAAAAAMwE/r8lj3LcIvh8/s1600/15-10%2B~%2BGIF%2B~%2BPlease%2BWait.gif"
            alt="Loading"
            className="loader"
          />
        </div>
      );
    } else {
      return '';
    }
  }
}

export default SnippetDetail;
