import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class Main extends Component {
  state = {
    id: '',
    name: '',
    price: '',
    currencyCode: '',
    editMode: false,
  }

  // check for updated redux state
  componentDidUpdate(prevProps) {
    if (this.props.reduxState.productDetails !== prevProps.reduxState.productDetails) {
      this.setState({
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
    console.log(`id is`, this.state.id);
    event.preventDefault();
    this.props.dispatch({ type: 'GET_DETAILS', payload: this.state.id });
    this.setState({
      id: this.state.id,
      name: '',
      price: '',
      currencyCode: '',
      editMode: false,
    })
  }

  editMode = () => {
    this.setState({
      editMode: true,
    })
  }

  updatePrice = () => {
    console.log(`new price`, this.state.price);
    this.props.dispatch({ type: 'UPDATE_PRICE', payload: {id: this.state.id, newPrice: this.state.price }});
    this.setState({
      editMode: false,
    })
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
              <td>{this.state.id}</td>
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
          {JSON.stringify(this.state)}
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
