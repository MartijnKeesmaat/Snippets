import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <a href="">Filter</a>
        <input type="text" placeholder="filter this.." />

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
