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
      return(
        <table>
          <thead>
            <tr>
              <th>I.D.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.reduxState.productDetails.id}</td>
              <td>{this.props.reduxState.productDetails.name}</td>
              <td>{this.props.reduxState.productDetails.price}</td>
              <td><button>Update Price</button></td>
            </tr>
          </tbody>
        </table>
      )
  }

  render() {
    return (
      <div className="main-content">
        {/* {JSON.stringify(this.state)} */}
        <header>
          <h1>myRetail Product Search</h1>
        </header>
        <div className="container">
          <form>
            <label htmlFor="product-id">Please enter a product id:</label>
            <input onChange={this.handleChange} placeholder="i.e. 44357291" value={this.state.productId} id="product-id" type='number' required />
            <button onClick={this.handleSubmit}>Get Details</button>
          </form>
        </div>
        {this.props.reduxState.productDetails === [''] ? this.createTable() : null}
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
})

export default connect(mapReduxStateToProps)(Main);
