import React, { Component } from "react";
//import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { withRouter, NavLink, Link } from "react-router-dom";

class Candies extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dumbyCandy = [
      {
        id: 1,
        name: "Cavendish Drops",
        price: 3,
        description: "Classy, tart, make your heart drop",
        image: "./images/cavendishcandy.jpg",
        quantity: 20,
        categoryId: 1
      },
      {
        id: 2,
        name: "Chewy Candy Mix",
        price: 3,
        description:
          "A mix of sweet, tart, little colored things of absolute taste perfection",
        image: "./images/chewycandymix.jpg",
        quantity: 20,
        categoryId: 10
      },
      {
        id: 3,
        name: "Chocolate Abundance",
        price: 10,
        description: "Countless varieties of the treat of the Gods",
        image: "./images/chocoloateabundance.jpg",
        quantity: 20,
        categoryId: 10
      },
      {
        id: 4,
        name: "Confiserie Chocolate",
        price: 12,
        description: "Decadence, heaven, my oh my flavor everywhere",
        image: "./images/confiseriechocolate.jpg",
        quantity: 15,
        categoryId: 1
      },
    ];

    return (
      <div>
        <h1>All Candy</h1>
        {dumbyCandy.map(candy => (
          <div className="all-candies" key={candy.id}>
            <NavLink to={`/candies/${candy.id}`}>
              <h2>{candy.name}</h2>
              <img src={candy.image} />
              <h3>{candy.description}</h3>
              <h3>Stock: {candy.quantity}</h3>
            </NavLink>
          </div>
        ))}
      </div>
    );
  }
}

/**
   * CONTAINER
   */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick () {
//       dispatch(logout())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Candies));
