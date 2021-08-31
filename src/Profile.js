import { Component } from 'react';

class Profile extends Component {

  render() {
    /* TODO: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    return (
      <>
      <h2>{this.props.email}</h2>
      {/* <h2>{this.props.username}</h2> */}
      </>
    )
      

  }
}

export default Profile;
