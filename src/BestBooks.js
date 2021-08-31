import React from 'react';
import Book from './Book';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookError: '',
    };
  }

  /* DONE: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    const server_PORT = process.env.REACT_APP_BACKEND_URL;
    const server = `${server_PORT}/books`;
    try {
      const response = await axios.get(server);
      this.setState({books:response.data});
    } catch (error) {
      this.setState({bookError: true});
    }
  }

  componentDidMount(){
    this.getBooks();
  }

  render() {

    /* DONE: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          this.props.books.map((book, idx) => {
            return (
              <Book
                title={book.title}
                description={book.description}
                status={book.status}
                email={book.email}
                key={idx}>
              </Book>
            );
          })
        ) : ( <h3>No Books Found </h3>
        )}
      </>
    );
  }
}

export default BestBooks;
