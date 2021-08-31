import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {

  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <Form onChange={this.props.handleFormInput}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="username" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.props.onLoginSubmit}>
          {/* TODO add/pass email on line 22 */}
        SUBMIT
        </Button>

      </Form>
    );
  }
}

export default LoginForm;
