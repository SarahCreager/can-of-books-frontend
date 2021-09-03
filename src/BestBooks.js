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
      showBookForm: false,
      selectedBook: null,
      title: this.props.book.title ? this.props.book.title : '',
      description: this.props.book.description ? this.props.book.description : '',
      status: this.props.book.status ? this.props.book.status : '',
    };
  }

  showBookFormHandler = () => {
    this.setState({
      showBookForm: true
    });
  }

  closeBookForm = () => {
    this.setState({
      showBookForm: false
    })
  }

  /* DONE: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    const server = `${server_PORT}/books`;
    try {
      const response = await axios.get(server);
      this.setState({ books: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  addBook = async (book) => {
    const books = [...this.state.books, book];
    this.setState({ books });
  };

  createBook = () => {
    this.props.auth0.getIdTokenClaims()
      .then(async res => {
        const jwt = res.__raw;

        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          data: {
            email: this.props.auth0.user.email,
            title: this.state.title,
            description: this.state.description,
            status: this.state.status,
          },
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: '/books',
          method: 'post'
        }

        const bookResults = await axios(config);
        this.closeBookForm();
        this.addBook(bookResults.data);
      })
      .catch(err => console.error(err));
  }





  handleUpdateModal = (book) => {
    this.setState({
      selectedBook: book
    })
  }

  handleUpdate = async (bookToUpdate) => {
    const server = `${server_PORT}/books/${bookToUpdate._id}`;
    try {
      const response = await axios.put(server, bookToUpdate);
      const updatedBook = response.data;
      const books = this.state.books.map(currentBook => currentBook._id === updatedBook._id ? updatedBook : currentBook);

      this.setState({
        selectedBook: null,
        books
      })
    } catch (error) {
      console.error(error);
    }
  }




  handleDelete = async (bookToDelete) => {
    const server = `${server_PORT}/books/${bookToDelete._id}`;
    await axios.delete(server);
    // TODO: need to sort out conditional to make sure users email matches booktodelete email)
    try {
      const books = this.state.books.filter(candidate => candidate._id !== bookToDelete._id);
      this.setState({ books });
      alert(bookToDelete.title + ' has been deleted');
    } catch (error) {
      console.log('error');
    }
  };

  render() {

    /* DONE: render user's books in a Carousel */

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
                  onDelete={this.handleDelete}
                  onUpdateModal={this.handleUpdateModal}
                  book={book}>
                </Book>
              </Carousel.Item>
            );
          })}
          </Carousel>) : (<h3>No Books Found </h3>)}

        
        {this.state.showBookForm ? <BookFormModal onCreate={this.handleCreate} /> : <AddBookButton onButtonClick={this.showBookFormHandler} />}

        <UpdateBook book={this.state.selectedBook} onUpdate={this.handleUpdate} onClose={() => this.setState({ selectedBook: null })} />

      </>
    );
  }
}

export default withAuth0(BestBooks);
