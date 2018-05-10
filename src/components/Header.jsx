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

        {this.props.isLoggedIn === false ? (
          <div className="account">
            <a href="">E-mail</a>
            <a onClick={() => this.props.authenticate('Github')}>
              Log in with Github
            </a>
          </div>
        ) : (
          <a onClick={this.props.signOut}>Sign out</a>
        )}
      </header>
    );
  }
}

export default Header;
