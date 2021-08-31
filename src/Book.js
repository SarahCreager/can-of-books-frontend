import { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';


export default class Book extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
            <p>{this.props.status}</p>
            <p>{this.props.email}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
