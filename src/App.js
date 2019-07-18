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
    return (
      <div className="table-container">
        <table align="center">
          <thead>
            <tr>
              <th>I.D.</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.reduxState.productDetails[0].id}</td>
              <td>{this.props.reduxState.productDetails[0].name}</td>
              <td>$ {this.props.reduxState.productDetails[0].price.toFixed(2)}</td>
              <td><button className="update-button">Update Price</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="main-content">
          {/* {JSON.stringify(this.state)} */}
          <header>
            <h1>myRetail Product Search</h1>
          </header>
          <form>
            <label htmlFor="product-id">Please enter a product id:</label>
            <input onChange={this.handleChange} placeholder="i.e. 44357291" value={this.state.productId} id="product-id" type='number' required />
            <button onClick={this.handleSubmit} className="details-button">Get Details</button>
          </form>
        </div>
        {this.props.reduxState.productDetails !== [''] ? this.createTable() : null}
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
})

export default connect(mapReduxStateToProps)(Main);
