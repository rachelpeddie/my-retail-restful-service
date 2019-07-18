import React, { Component } from 'react';
import './App.css';

class Main extends Component {
  state = {
    productId: '',
  }

  handleChange = (event) => {
    this.setState({
      productId: event.target.value
    })
  }

  handleClick = (event) => {
    console.log(`productId is`, this.state.productId);
    event.preventDefault();
    // this.getProductDetails();
  }

  render() {
    return (
      <div className="main-content">
        {JSON.stringify(this.state)}
        <header>
          <h1>My Retail RESTful Service App</h1>
        </header>
        <form>
          <label htmlFor="product-id">Please enter a product id:</label>
          <input onChange={this.handleChange} placeholder="i.e. 44357291" value={this.state.productId} id="product-id" type='number' required />
          <button onClick={this.handleClick}>Get Details</button>
        </form>
      </div>
    );
  }
}

export default Main;
