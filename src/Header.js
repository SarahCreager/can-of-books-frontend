import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
// import Login from './Login';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>

          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          {this.props.auth0.isAuthenticated ? (<NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>) : null}

          {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/>}

        </Navbar>
      </>
    );
  }
}

export default withAuth0(Header);
