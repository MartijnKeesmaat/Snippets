import React from 'react';
import AceEditor from 'react-ace';
import Modal from 'react-awesome-modal';
import Editor from './EditorChange';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    showLineNumbers: true,
    copied: false,
    editModal: false
  };

  // Set references
  titleRef = React.createRef();
  descriptionRef = React.createRef();

  // Add label to snippet
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

  // Copy editor code
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

  openModal = () => {
    // Update content of modal to selected snippet
    const currentTitle = this.props.snippets[this.props.activeSnippet].title;
    const currentDesc = this.props.snippets[this.props.activeSnippet]
      .description;
    this.titleRef.current.value = currentTitle;
    this.descriptionRef.current.value = currentDesc;

    this.setState({ editModal: true });
  };

  closeModal = () => {
    this.setState({ editModal: false });
  };

  updateSnippet = e => {
    e.preventDefault();
    const title = this.titleRef.current.value;
    const desc = this.descriptionRef.current.value;
    this.props.editSnippet(title, desc);
    this.closeModal();
  };

  render() {
    const snippets = this.props.initialSnippets;
    const snippetIndex = this.props.activeSnippet;

    if (
      !this.props.isLoading &&
      this.props.hasSnippets &&
      this.props.hasInitialSnippets &&
      this.props.initialSnippets &&
      this.props.initialSnippets.length > 0
    ) {
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
                  onClick={() => this.openModal()}
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
                  <span className="snippet-detail__label-bar__control__fav">
                    <img
                      onClick={() => this.props.setFavorite(snippetIndex)}
                      src={require('../icons/fav.svg')}
                      alt=""
                    />
                  </span>
                )}
                {!snippets[snippetIndex].favorite && (
                  <img
                    onClick={() => this.props.setFavorite(snippetIndex)}
                    src={require('../icons/fav-empty.svg')}
                    alt=""
                  />
                )}
                <select onChange={this.setLabel}>
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

          <Modal
            visible={this.state.editModal}
            width="800"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <div className="modal">
              <div className="modal__inner">
                <h3>Edit snippet</h3>

                <form
                  onSubmit={this.updateSnippet}
                  className="add-snippet-form"
                >
                  <label>Title</label>
                  <input
                    name="title"
                    ref={this.titleRef}
                    type="text"
                    placeholder="Title"
                    required
                    defaultValue={
                      this.props.snippets[this.props.activeSnippet].title
                    }
                  />
                  <label>Description</label>
                  <textarea
                    defaultValue={
                      this.props.snippets[this.props.activeSnippet].description
                    }
                    name="description"
                    ref={this.descriptionRef}
                    placeholder="Description"
                    id=""
                    cols="20"
                    rows="5"
                  />

                  {this.props.snippets[this.props.activeSnippet].files.map(
                    (code, key) => (
                      <Editor
                        required
                        key={key}
                        index={key}
                        // getFileCode={this.getFileCode}
                        // addSnippet={this.addSnippet}
                        // getSnippetCode={this.getSnippetCode}
                        // getLang={this.getLang}
                      />
                    )
                  )}
                  <button type="submit" className="btn">
                    Update snippet
                  </button>
                </form>
                <a className="modal-close" onClick={this.props.closeModal}>
                  &times;
                </a>
              </div>
            </div>
          </Modal>
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
