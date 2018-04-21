import React from 'react';
import Modal from 'react-awesome-modal';

class Sidebar extends React.Component {
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

  createSnippet = e => {
    // Stop form from submitting
    e.preventDefault();

    // create new snippet
    const snippet = {
      title: this.titleRef.current.value,
      description: this.descriptionRef.current.value,
      files: [this.filesRef.current.value],
      dateCreated: this.getCurrentDate()
    };

    // add snippet to state
    this.props.addSnippet(snippet);

    // reset form
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
        </aside>

        <Modal
          visible={this.props.visible}
          width="400"
          effect="fadeInUp"
          onClickAway={this.props.closeModal}
        >
          <form onSubmit={this.createSnippet} className="add-snippet-form">
            <input
              name="title"
              ref={this.titleRef}
              type="text"
              placeholder="Title"
            />
            <textarea
              name="description"
              ref={this.descriptionRef}
              placeholder="Description"
              id=""
              cols="20"
              rows="5"
            />
            <textarea
              name="files"
              ref={this.filesRef}
              placeholder="Code"
              id=""
              cols="30"
              rows="10"
            />
            <button className="btn" type="submit">
              Add snippet
            </button>
          </form>
          <a
            href="javascript:void(0);"
            className="modal-close"
            onClick={this.props.closeModal}
          >
            &times;
          </a>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
