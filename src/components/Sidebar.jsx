import React from 'react';

class Sidebar extends React.Component {
  titleRef = React.createRef();
  descriptionRef = React.createRef();
  filesRef = React.createRef();

  createSnippet = e => {
    // Stop form from submitting
    e.preventDefault();

    const snippet = {
      title: this.titleRef.current.value,
      description: this.descriptionRef.current.value,
      files: this.filesRef.current.value
    };

    console.log(snippet);
  };

  render() {
    return (
      <aside className="main-content__inner main-content__inner--labels">
        <h3>Sidebar</h3>
        <form onSubmit={this.createSnippet}>
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
      </aside>
    );
  }
}

export default Sidebar;
