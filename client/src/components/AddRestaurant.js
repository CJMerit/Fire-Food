import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_RESTAURANT } from '../utils/mutations';

import Auth from '../utils/auth';

function AddRestaurant() {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [AddRestaurant, { error }] = useMutation(ADD_RESTAURANT)


  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either menuItem, date, rating, or comment
    if (inputType === 'name') {
      setName(inputValue);
    } else {
      setZipCode(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    try {
      const { data } = await AddRestaurant({
        variables: {
          name,
          zipcode: zipCode,
        },
      });

      setName('');
      setZipCode('');

    } catch (err) {
      console.error(err);
    }
    // any error checking conditional goes here. Output an error message if needed than call return

    alert(`Successfully submitted`);

    // If everything goes according to plan, we want to clear out the input after a successful form submission
    
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h2 className= 'flex-row justify-center p-2'
            >Add Restaurant</h2>
          <form className= 'flex-row justify-center mb-4 p-3 form'>
            <input
            className="form-control p-2 mb-4"
              value={name}
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="Restaurant Name"
            />
            <input
            className="form-control p-2 mb-4"
              value={zipCode}
              name="zipCode"
              onChange={handleInputChange}
              type="text"
              placeholder="Zipcode"
            />

            <button className="btn btn-danger"  type="button" onClick={handleFormSubmit}>Submit</button>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add a restaurant. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
}

export default AddRestaurant;
