import React  from 'react';
// import Register from './register';
import { Register, validateInput } from './register';


// Test suite for validateInput function
describe('validateInput', () => {

  // Mock the setErrorMessage and postDetails functions
  let setErrorMessage = jest.fn();
  let postDetails = jest.fn();

  // Test case when all fields are filled in and valid
  test('valid input', () => {
    // Set up the input data
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'Passw0rd';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage and postDetails were not called
    expect(setErrorMessage).not.toHaveBeenCalled();
    expect(postDetails).not.toHaveBeenCalled();
  });

  // Test case when one or more fields are empty
  test('missing field', () => {
    // Set up the input data
    const name = '';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'Passw0rd';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage was called with the correct message
    expect(setErrorMessage).toHaveBeenCalledWith('Please enter all details');

    // Check that postDetails was not called
    expect(postDetails).not.toHaveBeenCalled();
  });

  // Test case when the email is invalid
  test('invalid email', () => {
    // Set up the input data
    const name = 'John';
    const surname = 'Doe';
    const email = 'johndoe@examplecom';
    const username = 'johndoe';
    const password = 'Passw0rd';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage was called with the correct message
    expect(setErrorMessage).toHaveBeenCalledWith('Please enter a valid email');

    // Check that postDetails was not called
    expect(postDetails).not.toHaveBeenCalled();
  });

  // Test case when the password is weak
  test('weak password', () => {
    // Set up the input data
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'password';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage was called with the correct message
    expect(setErrorMessage).toHaveBeenCalledWith('Please enter a stronger password');

    // Check that postDetails was not called
    expect(postDetails).not.toHaveBeenCalled();
  });
});
