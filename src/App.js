import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import BestBooks from './BestBooks';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: '',
      username: ''
    };
  }

  loginHandler = (user) => {
    this.setState({
      user,
    });
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    });
  }
  
  formInputHandler = (event) => {
    this.setState({
      email: event.target.formEmail.value,
      username: event.target.formUsername.value,
      // username: event.target.username
    });
  }


  render() {
    console.log(this.state.user);
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* DONE: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {this.state.user ? <BestBooks/> : <Login onLoginSubmit={this.loginHandler} handleFormInput={this.formInputHandler} email={this.state.email}/>}
            </Route>
            {/* DONE: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path="/profile">
              <Profile email={this.state.email}/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
