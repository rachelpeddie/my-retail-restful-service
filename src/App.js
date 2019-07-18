import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  handleSubmit = (event) => {
    console.log(`productId is`, this.state.productId);
    event.preventDefault();
    this.getProductDetails();
  }

  getProductDetails = () => {
    this.props.dispatch({ type: 'GET_DETAILS' })
  }

  createTable = () => {
    if(this.props.reduxState.productDetails){
      return(
        <table>
          <thead>
            <tr>
              <th>I.D.</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.reduxState.productDetails.id}</td>
              <td>{this.props.reduxState.productDetails.name}</td>
              <td>{this.props.reduxState.productDetails.price}</td>
            </tr>
          </tbody>
        </table>
      )
    }
    else {
      null
    }
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
          <button onClick={this.handleSubmit}>Get Details</button>
        </form>
        {this.createTable()}
      </div>
    );
  }
}

export default connect()(Main);
