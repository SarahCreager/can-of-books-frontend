import { Component } from 'react';
import LoginForm from './LoginForm';
import Button from 'react-bootstrap/Button';

export default class LoginButton extends Component {

  showLoginForm = () => {
    <LoginForm></LoginForm>;
  }

  render() {

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return (
      <Button variant="secondary" size="lg"
        onClick={this.showLoginForm}>
        Log In
      </Button>
    );
  }
}
