import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: ''
    };
  }

  formInputHandler = (event) => {
    if (event.target.id === 'formEmail') {
      this.setState({
        email: event.target.value,
      });
    } else if (event.target.id === 'formUsername') {
      this.setState({
        username: event.target.value,
      });
    }
  }

  render() {
    /* DONE: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <Form onSubmit={ (event) => this.props.onLoginSubmit({username: this.state.username, email: this.state.email}, event)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control onChange={this.formInputHandler} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={this.formInputHandler} type="username" placeholder="username" />
        </Form.Group>

        <Button variant="primary" type="submit">
          SUBMIT
        </Button>

      </Form>
    );
  }
}

export default LoginForm;
