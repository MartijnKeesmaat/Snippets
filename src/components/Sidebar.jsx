import React from 'react';
import Modal from 'react-awesome-modal';
import Editor from './Editor';

class Sidebar extends React.Component {
  state = {
    snippetCode: ''
  };

  titleRef = React.createRef();
  descriptionRef = React.createRef();
  filesRef = React.createRef();

  getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return (today = dd + '/' + mm + '/' + yyyy);
  };

  getCurrentTime = () => {
    const d = new Date();
    const h = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    return h + ':' + min + ':' + sec;
  };

  getSnippetCode = snippetCode => {
    this.state.snippetCode = snippetCode;
  };

  createSnippet = e => {
    e.preventDefault();
    const snippet = {
      title: this.titleRef.current.value,
      description: this.descriptionRef.current.value,
      files: [this.state.snippetCode],
      dateCreated: this.getCurrentDate(),
      timeCreated: this.getCurrentTime()
    };
    this.props.addSnippet(snippet);
    e.currentTarget.reset();
  };

  render() {
    return (
      <div>
        <aside className="main-content__inner main-content__inner--labels">
          <h3>Sidebar</h3>
          <button className="btn" onClick={this.props.openModal}>
            Add snippet
          </button>

          <a href="">All snippets</a>
          <a href="">Starred</a>

          <h4>Labels</h4>
          <a href="">Docs</a>
          <a href="">Cool</a>
          <a href="">Story</a>
        </aside>
        <Modal
          visible={this.props.visible}
          width="900"
          effect="fadeInUp"
          onClickAway={this.props.closeModal}
        >
          <h3>Add new snippet</h3>

          <form onSubmit={this.createSnippet} className="add-snippet-form">
            <label>Title</label>
            <input
              name="title"
              ref={this.titleRef}
              type="text"
              placeholder="Title"
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
            <Editor
              getFileCode={this.getFileCode}
              addSnippet={this.addSnippet}
              getSnippetCode={this.getSnippetCode}
            />
            <button type="submit">Add snippet</button>
          </form>
          <a className="modal-close" onClick={this.props.closeModal}>
            &times;
          </a>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
