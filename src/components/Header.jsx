import React from 'react';

class Header extends React.Component {
  onChange = event => {
    this.props.searchSnippets(event);
  };

  render() {
    return (
      <header>
        <input
          type="text"
          placeholder="Search on title or description"
          onChange={this.onChange}
        />

        {this.props.isLoggedIn === false ? (
          <div className="account">
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
