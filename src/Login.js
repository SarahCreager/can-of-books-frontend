import React from 'react';
import Card from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton';
import LoginForm from './LoginForm';




class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  showFormHandler = () => {
    this.setState({
      showForm: true
    });
  }

  render() {
    return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Log In</Card.Title>
            <Card.Text>
              Click Below to Log In
            </Card.Text>
            {/* DONE: add a `LoginButton` component here that will log the user in */}
            {this.state.showForm ? <LoginForm onLoginSubmit={this.props.onLoginSubmit}/> : <LoginButton onButtonClick={this.showFormHandler} />}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Login;
