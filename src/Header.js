import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
// import Login from './Login';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>

          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/create" className="nav-link">Create</Link></NavItem>

          {this.props.user ? (<NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>) : null}
          {/* DONE: if the user is logged in, render a navigation link to profile page */}
          {this.props.user ? <LogoutButton onLogout={this.props.onLogout}/> : null}
          {/* DONE: if the user is logged in, render the `LogoutButton` */}
        </Navbar>
      </>
    );
  }
}

export default Header;
