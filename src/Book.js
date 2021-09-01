import { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImg from './assets/carouselImg.jpg';


export default class Book extends Component {
  render() {
    return (
      <>
        <img
          className="d-block w-100"
          src={CarouselImg}
          alt="img of book"
        />
        <Carousel.Caption>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <p>{this.props.status}</p>
          <button onClick={() => this.props.onDelete(this.props.book)}>Delete Book</button>
        </Carousel.Caption>
      </>
    );
  }
}
