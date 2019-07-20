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
        price: this.props.reduxState.productDetails.price,
        currencyCode: this.props.reduxState.productDetails.currencyCode,
      })
    }
  }

  // sets id as typed for sending in dispatch
  handleChangeId = (event) => {
    this.setState({
      id: event.target.value
    })
  }

  handleSubmit = (event) => {
    console.log(`id is`, this.state.id);
    event.preventDefault();
    this.props.dispatch({ type: 'GET_DETAILS', payload: this.state.id })
  }

  editMode = () => {
    this.setState({
      editMode: !this.state.editMode,
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
              {this.state.editMode === false ? <td>$ {this.state.price}</td> : <td>$ <input>{this.state.price}</input></td>}
              
              <td><button className="update-button" onClick={this.editMode}>{this.state.editMode === false ? 'Update Price' : 'Save Price'}</button></td>
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
            <input onChange={this.handleChangeId} placeholder="i.e. 44357291" value={this.state.id} id="product-id" type='number' required />
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
