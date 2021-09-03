import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './AddBookButton.css'; 


export default class AddBookButton extends Component {


  render() {

    return (
      <div id="createBookButton">
        <Button id="addABookButton" variant="secondary" size="lg"
          onClick={this.props.onButtonClick}>
          Create a Book
        </Button>
      </div>
    );
  }
}
