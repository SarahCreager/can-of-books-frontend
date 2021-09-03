import React from 'react';
import Book from './Book';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import AddBookButton from './AddBookButton';
import Carousel from 'react-bootstrap/Carousel';
import UpdateBook from './UpdateBook';
import { withAuth0 } from '@auth0/auth0-react';

const server_PORT = process.env.REACT_APP_BACKEND_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      selectedBook: null,
    };
  }

  //This is showing the create a book form
  showBookFormHandler = () => {
    this.setState({
      showModal: true
    });
  }

  //this was our app.get function before
  componentDidMount = () => {
    this.props.auth0.getIdTokenClaims().then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        baseURL: server_PORT,
        url: '/books',
        params: { email: this.props.auth0.user.email },
        method: 'get'
      };

      const response = await axios(config);

      this.setState({ books: response.data });
    })
      .catch(err => console.error(err));
  }

  //This function, along with addBook is creating a book
  createBook = async (bookInfo) => {
    this.props.auth0.getIdTokenClaims().then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        data: bookInfo,
        baseURL: server_PORT,
        url: '/books',
        method: 'post',
        params: { email: this.props.auth0.user.email }
      };
      try {
        const response = await axios(config);
        const newBook = response.data;
        const books = [...this.state.books, newBook];
        this.setState({ books });
        this.setState({ showModal: false });
      } catch (err) {
        console.error(err);
      }
    });
  }

  //This is showing the update a book form
  handleUpdateModal = (book) => {
    this.setState({
      selectedBook: book
    });
  }

  //This is hiding the update a book form
  closeUpdateModal = () => {
    this.setState({
      selectedBook: null
    });
  }

  updateBook = async (bookToUpdate) => {

    this.props.auth0.getIdTokenClaims().then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` },
        data: bookToUpdate,
        method: 'put',
        baseURL: server_PORT,
        url: `/books/${bookToUpdate._id}`,
        params: { email: this.props.auth0.user.email },
      };
      try {
        const response = await axios(config);
        const updatedBook = response.data;
        const books = this.state.books.map(currentBook => updatedBook._id === currentBook._id ? updatedBook : currentBook);
        this.setState({ books, selectedBook: null });
      } catch (err) {
        console.log(err);
      }
    });
  }

  // function that removes book from carousel
  removeBook = async (bookToRemove) => {
    this.props.auth0.getIdTokenClaims().then(async res => {
      const jwt = res.__raw;
      const config = {
        params: { email: this.props.auth0.user.email },
        headers: { 'Authorization': `Bearer ${jwt}` },
        method: 'delete',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/books/${bookToRemove._id}`,
        data: bookToRemove,
      };
      await axios(config);
      const books = this.state.books.filter(candidate => candidate._id !== bookToRemove._id);
      this.setState({ books });
    });
  }

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>{this.state.books.map((book) => {
            return (
              <Carousel.Item key={book._id}>
                <Book
                  title={book.title}
                  description={book.description}
                  status={book.status}
                  email={book.email}
                  onDelete={this.removeBook}
                  onUpdateModal={this.handleUpdateModal}
                  book={book}>
                </Book>
              </Carousel.Item>
            );
          })}
          </Carousel>) : (<h3>No Books Found </h3>)}


        {this.state.showModal ? <BookFormModal onCreate={this.createBook} /> : <AddBookButton onButtonClick={this.showBookFormHandler} />}

        <UpdateBook book={this.state.selectedBook} onUpdate={this.updateBook} onClose={this.closeUpdateModal} />

      </>
    );
  }
}

export default withAuth0(BestBooks);
