import React from 'react';
import Book from './Book';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import AddBookButton from './AddBookButton';
import Carousel from 'react-bootstrap/Carousel';
import UpdateBook from './UpdateBook';

const server_PORT = process.env.REACT_APP_BACKEND_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBookForm: false,
      selectedBook: null
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

export default BestBooks;
