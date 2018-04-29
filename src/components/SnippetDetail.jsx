import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/theme/tomorrow';

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
    showLineNumbers: true
  };

  addToFav = () => {
    this.props.getFav(this.props.activeSnippet);
  };

  render() {
    const snippets = this.props.snippets;
    const asn = this.props.activeSnippet;

    if (this.props.snippets.length > 0) {
      this.state.value = snippets[asn].files[0];
      return (
        <div className="main-content__inner main-content__inner--detail snippet-detail">
          <div className="snippet-detail__top-bar">
            <div className="snippet-detail__time">
              <span className="snippet-detail__time__created">Created</span>
              <span className="snippet-detail__time__fill">
                {snippets[asn].dateCreated} - {snippets[asn].timeCreated}
              </span>
            </div>

            <div className="snippet-detail__controls">
              <img src={require('../icons/edit.svg')} alt="" />
              <img src={require('../icons/trash.svg')} alt="" />
            </div>
          </div>

          <h2>{snippets[asn].title}</h2>
          <p className="snippet-detail__desc">{snippets[asn].description}</p>

          <div className="snippet-detail__label-bar">
            <div className="snippet__labels">
              <div className="card snippet__label snippet__label--fav">
                Favorite
              </div>
              <div className="card snippet__label">Docs</div>
              <div className="card snippet__label">Very nice</div>
            </div>

            <div className="snippet-detail__label-bar__control">
              <img src={require('../icons/fav.svg')} alt="" />
              <select>
                <option selected disabled>
                  Labels
                </option>
                <option value="docs">Docs</option>
                <option value="docs">React</option>
                <option value="docs">Very nice</option>
              </select>
            </div>
          </div>

          <hr />

          {/* <button onClick={this.addToFav}>Star</button> */}
          {snippets[asn].files.map((key, index) => (
            <div className="editor-detail card">
              <div className="editor-detail__top">
                <p className="editor-detail__top__lang">Javascript</p>
                <p className="editor-detail__copy">Copy code</p>
              </div>
              <AceEditor
                key={key}
                mode={this.state.mode}
                theme={this.state.theme}
                onValidate={this.onValidate}
                value={snippets[asn].files[index]}
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
                  enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                  enableSnippets: this.state.enableSnippets,
                  showLineNumbers: this.state.showLineNumbers,
                  tabSize: 2
                }}
              />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="main-content__inner main-content__inner--detail">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="Loading"
          width="150px"
        />
      </div>
    );
  }
}

export default SnippetDetail;
