import { Component } from 'react';
import Button from 'react-bootstrap/Button';


export default class LoginButton extends Component {


  render() {

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return (
      <Button variant="secondary" size="lg"
        onClick={this.props.onButtonClick}>
        Log In
      </Button>
    );
  }
}
