import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class Main extends Component {
  state = {
    id: '',
    productId: '',
    name: '',
    price: '',
    currencyCode: '',
    editMode: false,
  }

  // check for updated redux state
  componentDidUpdate(prevProps) {
    if (this.props.reduxState.productDetails !== prevProps.reduxState.productDetails) {
      this.setState({
        productId: this.props.reduxState.productDetails.id,
        name: this.props.reduxState.productDetails.name,
        price: this.props.reduxState.productDetails.price.toFixed(2),
        currencyCode: this.props.reduxState.productDetails.currencyCode,
      })
    }
  }

  // sets id as typed for sending in dispatch
  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'GET_DETAILS', payload: this.state.id });
    this.setState({
      id: '',
      productId: '',
      name: '',
      price: '',
      currencyCode: '',
      editMode: false,
    })
  }

  // sets edit mode to true to trigger conditional rendering of price input field
  editMode = () => {
    this.setState({
      editMode: true,
    })
  }

  // sends new price to saga with id to update in database, sets edit mode to false to render static price element
  updatePrice = () => {
    this.props.dispatch({ type: 'UPDATE_PRICE', payload: {id: this.state.productId, newPrice: this.state.price }});
    this.setState({
      editMode: false,
    })
  }

  // creates table to display product details, only displays if name and price exist - conditionally renders update price and save price button as well as static price and price input field for editing product price
  createTable = () => {
    return (
      <div className="table-container">
        <table align="center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.productId}</td>
              <td>{this.state.name}</td>
              {this.state.editMode === false ? <td>${this.state.price} {this.state.currencyCode}</td> : <td>$ <input onChange={this.handleChangeFor('price')} value={this.state.price} id="product-price" type='number' required /></td>}
              {this.state.editMode === false ?
              <td><button className="update-button" onClick={this.editMode}>Update Price</button></td> :
              <td><button className="update-button" onClick={this.updatePrice}>Save Price</button></td>}
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
          <header>
            <h1>myRetail Product Search</h1>
          </header>
          <form>
            <label htmlFor="product-id">Please enter a product id:</label>
            <input onChange={this.handleChangeFor('id')} placeholder="i.e. 44357291" value={this.state.id} id="product-id" type='number' required />
            <button onClick={this.handleSubmit} className="details-button">Get Details</button>
          </form>
        </div>
        {this.state.name !== '' || this.state.price !== '' ? this.createTable() : null }
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
})

export default connect(mapReduxStateToProps)(Main);
