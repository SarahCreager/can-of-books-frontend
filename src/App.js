import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
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
      user: null
    };
  }

  loginHandler = (user, event) => {
    event.preventDefault();
    this.setState({
      user
    });
  }

  logoutHandler = () => {
    this.setState({
      user: null
    });
  }


  render() {
    return (
      <>
        <Router>

          {/* <Header user={this.state.user} onLogout={this.logoutHandler} /> */}
          <Header/>

          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <BestBooks /> : <Login onLoginSubmit={this.loginHandler} handleFormInput={this.formInputHandler} />}
            </Route>

            <Route path="/profile">
              {/* {this.state.user ? <Profile user={this.state.user} /> : <h3>No Profile Found </h3>} */}
            <Profile/>
            </Route>
            
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
