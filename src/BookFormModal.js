import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BookFormModal extends Component {

  handleBookSubmit = (event) => {
    event.preventDefault();
    const bookInfo = {
      title: event.target.bookTitle.value,
      description: event.target.bookDescription.value,
      status: event.target.statusCheckbox.checked,
      email: event.target.userEmail.value,
    };
    this.props.onCreate(bookInfo);
  }



  render() {
    return (
      <Form onSubmit={this.handleBookSubmit}>
        <Form.Group className="mb-3" controlId="bookTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="title" placeholder="Enter book title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bookDescription">
          <Form.Label>Description</Form.Label>
          {/* //might not need onChange */}
          <Form.Control type="description" placeholder="Enter book description" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="statusCheckbox">
          <Form.Check type="checkbox" label="Read" />
        </Form.Group>

        <Button variant="primary" type="submit">
          SUBMIT
        </Button>

      </Form>
    );
  }
}

export default BookFormModal;
