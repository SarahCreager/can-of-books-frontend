import { Component } from 'react';
import Button from 'react-bootstrap/Button';


export default class AddBookButton extends Component {


  render() {

    return (
      <Button variant="secondary" size="lg"
        onClick={this.props.onButtonClick}>
        Create a Book
      </Button>
    );
  }
}
