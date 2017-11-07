import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putUserThunk } from '../store/users.js';

//way to force user to reset password??
class PutUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectUser: {},
      name: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      isClick: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
     let userObj = {};

    if (this.state.firstname.length !== 0) {
      userObj.firstName = this.state.firstname;
    }
    if (this.state.lastname.length !== 0) {
      userObj.lastName = this.state.lastname;
    }
    if (this.state.email.length !== 0) {
      userObj.email = this.state.email;
    }
    if (this.state.password.length !== 0) {
      userObj.password = this.state.password;
    }
    userObj.id = this.state.selectUser.id;
    this.props.putUser(userObj);
  }

  handleSelect(event) {
    event.preventDefault();
    let selectUser = this.props.allUsers.find(user => {
      return +user.id === +event.target.user.value
    })

    this.setState({ selectUser, isClick: true });
  }

  render() {
    return (
      <div>
        {this.props.allUsers &&
          <form onSubmit={this.handleSelect}>
            <select className="browser-default" name="user">
              {
                this.props.allUsers.map(user => {
                  return (
                    <option value={user.id} key={user.firstName + ' ' + user.lastName}>{user.firstName + ' ' + user.lastName}</option>
                  )
                })
              }
            </select>
            <input type="submit" value="select the category to change" />
          </form>
        }
        {this.state.isClick &&
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
            <input
                type="text" name="firstname"
                onChange={this.handleChange}
                placeholder={this.state.firstName}
                autoFocus />
            </label>
            <label>
              Last Name:
            <input
                type="text" name="lastname"
                onChange={this.handleChange} />
              placeholder={this.state.lastname}
            </label>
            <label>
              Email:
            <input
                type="text" name="email"
                onChange={this.handleChange}
                placeholder={this.state.email}
              />
            </label>
            <label>
              password:
          <input
                type="password" name="password"
                onChange={this.handleChange} />
              />
        </label>
            <input type="submit" value="Submit" />
          </form>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  putUser: (product) => {
    return dispatch(putUserThunk(product));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PutUser));
