import React from 'react';
import Modal from 'react-awesome-modal';
import Editor from './Editor';
import { getCurrentDate, getCurrentTime } from '../helpers';

class Sidebar extends React.Component {
  state = {
    snippetCode: [''],
    fileComponents: [1]
  };

  titleRef = React.createRef();
  descriptionRef = React.createRef();
  filesRef = React.createRef();

  getSnippetCode = (snippetCode, key) => {
    this.state.snippetCode[key] = snippetCode;
  };

  addFile = e => {
    const fileComponents = this.state.fileComponents;
    fileComponents.push(1);
    this.setState({
      fileComponents
    });
  };

  createSnippet = e => {
    e.preventDefault();
    const snippet = {
      title: this.titleRef.current.value,
      description: this.descriptionRef.current.value,
      files: this.state.snippetCode,
      dateCreated: getCurrentDate(),
      timeCreated: getCurrentTime(),
      favorite: false,
      labels: [],
      languages: []
    };
    this.props.addSnippet(snippet);
    e.currentTarget.reset();
  };

  render() {
    return (
      <div>
        <aside className="sidebar card">
          <div className="sidebar__inner">
            <h3>Snippets</h3>
            <button className="btn" onClick={this.props.openModal}>
              Add snippet
            </button>

            <div className="sidebar__links">
              <button
                href=""
                onClick={this.props.showAllSnippets}
                className="sidebar__link"
              >
                <img src={require('../icons/code.svg')} alt="" />
                All snippets
              </button>
              <button
                onClick={this.props.showFavorites}
                className="sidebar__link"
              >
                <img src={require('../icons/fav.svg')} alt="" />
                Favorites
              </button>
            </div>

            <div className="sidebar__links">
              <h3>Labels</h3>
              <a href="" className="sidebar__link">
                <span className="sidebar__label__icon" />
                All snippets
              </a>
              <a href="" className="sidebar__link">
                <span className="sidebar__label__icon" />
                Favorites
              </a>
            </div>

            <div className="sidebar__links sidebar__links--lang">
              <h3>Languages</h3>
              <a href="" className="sidebar__link">
                <img src={require('../icons/hash.svg')} alt="" />
                All snippets
              </a>
              <a href="" className="sidebar__link">
                <img src={require('../icons/hash.svg')} alt="" />
                Favorites
              </a>
            </div>
          </div>
        </aside>

        <Modal
          visible={this.props.visible}
          width="900"
          effect="fadeInUp"
          onClickAway={this.props.closeModal}
        >
          <div className="modal">
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
                />
              ))}

              <a onClick={this.addFile}>Add file</a>
              <button type="submit" className="btn">
                Add snippet
              </button>
            </form>
            <a className="modal-close" onClick={this.props.closeModal}>
              &times;
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
