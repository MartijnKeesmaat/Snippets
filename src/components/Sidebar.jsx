import React from 'react';
import Modal from 'react-awesome-modal';
import Editor from './Editor';
import { getCurrentDate, getCurrentTime } from '../helpers';

class Sidebar extends React.Component {
  state = {
    snippetCode: [''],
    fileComponents: [],
    lang: ['javascript'],
    addLabel: false
  };

  // Set references
  titleRef = React.createRef();
  addLabelRef = React.createRef();
  descriptionRef = React.createRef();
  filesRef = React.createRef();

  getSnippetCode = (snippetCode, key) => {
    this.state.snippetCode[key] = snippetCode;
  };

  // Add file in editor
  addFile = e => {
    const fileComponents = this.state.fileComponents;
    fileComponents.push('comp');
    this.getLang;
    this.setState({
      fileComponents
    });
  };

  removeFile = index => {
    const fileComponents = this.state.fileComponents.splice(index, 1);
    this.setState({
      fileComponents
    });
  };

  // Get language from editor
  getLang = (language, key) => {
    const lang = this.state.lang;
    lang[key] = language;

    this.setState({
      lang
    });
  };

  // Create snippet object and add to snippets
  createSnippet = e => {
    e.preventDefault();
    const snippet = {
      title: this.titleRef.current.value,
      description: this.descriptionRef.current.value,
      files: this.state.snippetCode,
      languages: this.state.lang,
      dateCreated: getCurrentDate(),
      timeCreated: getCurrentTime(),
      favorite: false,
      labels: ['']
    };
    this.props.addSnippet(snippet);
    e.currentTarget.reset();
    console.log(snippet);
  };

  // Add custom label
  createLabel = e => {
    e.preventDefault();
    const labelName = this.addLabelRef.current.value;
    this.props.addLabel(labelName);
    this.toggleLabelAdd();
    e.currentTarget.reset();
  };

  // Show label input
  toggleLabelAdd = () => {
    this.setState({
      addLabel: !this.state.addLabel
    });

    if (!this.state.addLabel) {
      // wait for setState
      var here = this;
      var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
          clearTimeout(timer);
          timer = setTimeout(callback, ms);
        };
      })();

      delay(function() {
        here.addLabelRef.current.focus();
      }, 1);
    }
  };

  filterLabel = e => {
    this.props.filterLabel(e);
  };

  openModal = () => {
    console.log('asdf');

    this.setState({
      fileComponents: []
    });
    this.props.openModal();
  };

  render() {
    return (
      <div>
        <aside className="sidebar card">
          <div className="scroll-container">
            <div className="sidebar__inner">
              <h3>Snippets</h3>
              <button
                className={
                  'btn ' +
                  (!this.props.hasSnippets && this.props.isLoading === false
                    ? 'btn--glow'
                    : '')
                }
                onClick={() => this.openModal()}
              >
                Add snippet
              </button>
              {!this.props.hasSnippets &&
                this.props.isLoading === false && <div className="overlay" />}
              <div className="sidebar__links">
                <button
                  href=""
                  onClick={this.props.showAllSnippets}
                  className="sidebar__link sidebar__link--active"
                >
                  <img src={require('../icons/code.svg')} alt="" />
                  All snippets
                </button>
                <button
                  onClick={this.props.filterFavorites}
                  className="sidebar__link"
                >
                  <img src={require('../icons/fav.svg')} alt="" />
                  Favorites
                </button>
              </div>
              <div className="sidebar__links">
                <div className="sidebar__links__label-header">
                  <h3>Labels</h3>
                  <button onClick={() => this.toggleLabelAdd()}>+</button>
                </div>
                {this.state.addLabel && (
                  <form className="addLabel" onSubmit={this.createLabel}>
                    <input
                      type="text"
                      placeholder="Name your label"
                      ref={this.addLabelRef}
                      id="addLabel"
                    />
                    <button type="submit" className="btn">
                      +
                    </button>
                  </form>
                )}
                {this.props.labels.map((label, key) => (
                  <button
                    onClick={this.filterLabel}
                    href=""
                    className="sidebar__link"
                    key={key}
                  >
                    <span className="sidebar__label__icon" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="sidebar__links sidebar__links--lang">
                <h3>Languages</h3>
                {this.props.languages.map((lang, key) => (
                  <button
                    className="sidebar__link"
                    onClick={e => this.props.filterLanguage(e)}
                    key={key}
                  >
                    <img src={require('../icons/hash.svg')} alt="" />
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <Modal
          visible={this.props.visible}
          width="800"
          effect="fadeInUp"
          onClickAway={this.props.closeModal}
        >
          <div className="modal">
            <div className="modal__inner">
              <h3>Add new snippet</h3>

              <form onSubmit={this.createSnippet} className="add-snippet-form">
                <label>Title</label>
                <input
                  name="title"
                  ref={this.titleRef}
                  type="text"
                  placeholder="Title"
                  required
                />
                <label>Description</label>
                <textarea
                  name="description"
                  ref={this.descriptionRef}
                  placeholder="Description"
                  id=""
                  cols="20"
                  rows="5"
                />

                {this.state.fileComponents.map((code, key) => (
                  <Editor
                    required
                    key={key}
                    index={key}
                    getFileCode={this.getFileCode}
                    addSnippet={this.addSnippet}
                    getSnippetCode={this.getSnippetCode}
                    getLang={this.getLang}
                    removeFile={this.removeFile}
                  />
                ))}

                <a className="add-file" onClick={this.addFile}>
                  + Add code
                </a>
                <button type="submit" className="btn">
                  Add snippet
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
  }
}

export default Sidebar;
