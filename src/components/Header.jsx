import React from 'react';

class Header extends React.Component {
  onChange = event => {
    this.props.searchSnippets(event);
  };

  render() {
    return (
      <header>
        <a href="">Filter</a>
        <input
          type="text"
          placeholder="filter this.."
          onChange={this.onChange}
        />

        <div className="account">
          <a href="">Log in</a>
          <a href="">Log out</a>
          <a href="">Sign up</a>
        </div>
      </header>
    );
  }
}

export default Header;
