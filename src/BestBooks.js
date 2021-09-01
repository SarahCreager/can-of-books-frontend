import React from 'react';
import Book from './Book';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import AddBookButton from './AddBookButton';
import Carousel from 'react-bootstrap/Carousel';

const server_PORT = process.env.REACT_APP_BACKEND_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBookForm: false,
    };
  }

  showBookFormHandler = () => {
    this.setState({
      showBookForm: true
    });
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

  handleCreate = async (bookInfo) => {
    const server = `${server_PORT}/books`;
    const response = await axios.post(server, bookInfo);
    const newBook = response.data;
    const books = [...this.state.books, newBook];
    this.setState({ books });
  };

  handleDelete = async (bookToDelete) => {
    const server = `${server_PORT}/books/${bookToDelete._id}`;
    await axios.delete(server);
    // TODO: need to sort out conditional to make sure users email matches booktodelete email)
    if (bookToDelete.email){
      const books = this.state.books.filter(candidate => candidate._id !== bookToDelete._id);
      this.setState({ books });
      alert(bookToDelete.title +' has been deleted');
    } else {
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
                  email={book.email}>
                </Book>
                {/* TODO: Delete Not working on Carousel */}
                <p onClick={() => this.onDelete(book)}>[X]</p>
              </Carousel.Item>
            );
          })}
          </Carousel>) : (<h3>No Books Found </h3>)}

        {this.state.showBookForm ? <BookFormModal onCreate={this.handleCreate} /> : <AddBookButton onButtonClick={this.showBookFormHandler} />}

      </>
    );
  }
}

export default BestBooks;
