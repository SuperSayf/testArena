import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import bycrypt from "bcryptjs";
import { putUserDetails, checkIfDetailsValid, update, ArenaProfile } from './arena-profile';
import React, { useState } from 'react';
import InputBoxForInfo from "../components/input-box-for-info";

//jest.mock('axios');

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn().mockImplementation((initialValue) => [initialValue, jest.fn()]),
//   }));  
  
jest.mock('axios', () => ({
create: jest.fn(() => ({
    interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
    },
})),
get: jest.fn(),
post: jest.fn(),
put: jest.fn(),
delete: jest.fn(),
}));
  

describe('putUserDetails function', () => {
  test('should make a POST request to update user details', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const userID = '1234';
    const newEmail = 'test@test.com';
    const newUsername = 'testuser';
    const newPassword = 'testpassword';

    await putUserDetails(userID, newEmail, newUsername, newPassword);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3002/api/post/updateDetails', {
      user_id: userID,
      user_email: newEmail,
      user_nickname: newUsername,
      user_password: newPassword,
    });
  });
});

describe('checkIfDetailsValid function', () => {
  test('should return true when all fields are valid', () => {
    const newEmail = 'test@test.com';
    const newUsername = 'testuser';
    const password = 'testpassword';
    const newPassword = 'TestPassword123';

    expect(checkIfDetailsValid(newEmail, newUsername, password, newPassword)).toBe(true);
  });

  test('should return false when email or username is empty', () => {
    const newEmail = '';
    const newUsername = 'testuser';
    const password = 'testpassword';
    const newPassword = 'TestPassword123';

    expect(checkIfDetailsValid(newEmail, newUsername, password, newPassword)).toBe(false);
  });

  test('should return false when current password is empty', () => {
    const newEmail = 'test@test.com';
    const newUsername = 'testuser';
    const password = '';
    const newPassword = 'TestPassword123';

    expect(checkIfDetailsValid(newEmail, newUsername, password, newPassword)).toBe(false);
  });

  test('should return false when email is not in correct format', () => {
    const newEmail = 'invalid-email-format';
    const newUsername = 'testuser';
    const password = 'testpassword';
    const newPassword = 'TestPassword123';

    expect(checkIfDetailsValid(newEmail, newUsername, password, newPassword)).toBe(false);
  });

  test('should return false when password is not in correct format', () => {
    const newEmail = 'test@test.com';
    const newUsername = 'testuser';
    const password = 'testpassword';
    const newPassword = 'weakpassword';

    expect(checkIfDetailsValid(newEmail, newUsername, password, newPassword)).toBe(false);
  });
});

describe('update function', () => {
    beforeEach(() => {
      // Clear local storage before each test
      localStorage.clear();
    });
  
    test('should update user details when old password is correct and new password is not changed', async () => {
      // Arrange
      const userID = 123;
      const newEmail = 'newemail@example.com';
      const newUsername = 'newusername';
      const oldPassword = 'oldpassword';
      const password = oldPassword;
      const newPassword = '';
      const confirmPassword = '';
      const mockCompare = jest.fn((pass, hash, callback) => callback(null, true));
      const mockHashSync = jest.fn((pass, salt) => pass);
      bycrypt.compare = mockCompare;
      bycrypt.hashSync = mockHashSync;
      await putUserDetails(userID, newEmail, newUsername, newPassword);
      window.location.href = jest.fn();
  
      // Act
      update(password, oldPassword, newPassword, confirmPassword, userID, newEmail, newUsername);
      //await screen.findByText('Email and username updated');
  
      // Assert
      expect(mockCompare).toHaveBeenCalledWith(password, oldPassword, expect.any(Function));
      expect(mockHashSync).not.toHaveBeenCalled();
      //expect(putUserDetails).toHaveBeenCalledWith(userID, newEmail, newUsername, oldPassword);
      //expect(window.location.href).toHaveBeenCalledWith('http://localhost:3000/arena-home');
    });
  
    test('should update user details when old password is correct and new password is changed', async () => {
      // Arrange
      const userID = 123;
      const newEmail = 'newemail@example.com';
      const newUsername = 'newusername';
      const oldPassword = 'oldpassword';
      const password = oldPassword;
      const newPassword = 'newpassword123';
      const confirmPassword = newPassword;
      const mockCompare = jest.fn((pass, hash, callback) => callback(null, true));
      const mockHashSync = jest.fn((pass, salt) => `hashed-${pass}`);
      bycrypt.compare = mockCompare;
      bycrypt.hashSync = mockHashSync;
      await putUserDetails(userID, newEmail, newUsername, newPassword);
      window.location.href = jest.fn();
  
      // Act
      update(password, oldPassword, newPassword, confirmPassword, userID, newEmail, newUsername);
      //await screen.findByText('Details updated');
  
      // Assert
      expect(mockCompare).toHaveBeenCalledWith(password, oldPassword, expect.any(Function));
      expect(mockHashSync).not.toHaveBeenCalled();
      //expect(putUserDetails).toHaveBeenCalledWith(userID, newEmail, newUsername, `hashed-${newPassword}`);
      //expect(window.location.href).toHaveBeenCalledWith('http://localhost:3000/arena-home');
    });
});

// describe('InputBoxForInfo', () => {
//     test('updates new email when input field changes', () => {
//       // Arrange
//       const initialValue = '';
//       const buttonText = 'EMAIL';
//       const setIsLoading = jest.fn();
//       const setNewUsername = jest.fn();
//       const setPassword = jest.fn();
//       const setNewPassword = jest.fn();
//       const setConfirmPassword = jest.fn();
//       const setNewEmail = jest.fn();
//       useState.mockImplementation((initialValue) => [initialValue, setNewEmail]);
//       render(
//         <InputBoxForInfo
//           initialValue={initialValue}
//           buttonText={buttonText}
//           setIsLoading={setIsLoading}
//           setNewUsername={setNewUsername}
//           setPassword={setPassword}
//           setNewPassword={setNewPassword}
//           setConfirmPassword={setConfirmPassword}
//         />
//       );
//       const newEmailInput = screen.getByLabelText('EMAIL');
  
//       // Act
//       fireEvent.change(newEmailInput, { target: { value: 'test@test.com' } });
  
//       // Assert that the new email has been updated
//         expect(newEmailInput.value).toBe('test@test.com');

//     });
//   });

describe('ArenaProfile', () => {
    test('renders navbar', () => {
      render(<Router> <ArenaProfile /> </Router>);
      const navbar = screen.getByRole('Header');
      expect(navbar).toBeInTheDocument();
    });
  
    test('renders update profile section', () => {
      render(<Router> <ArenaProfile /> </Router>);
      const updateProfileSection = screen.getByText('UPDATE PROFILE');
      expect(updateProfileSection).toBeInTheDocument();
    });

    test('updates email when input field changes', () => {
        render(<Router> <ArenaProfile /> </Router>);
        const emailInput = screen.getByLabelText('USERNAME');
        fireEvent.change(emailInput, { target: { value: 'Namely' } });
        expect(emailInput.value).toBe('Namely');
      });
  
    test('updates email when input field changes', () => {
      render(<Router> <ArenaProfile /> </Router>);
      const emailInput = screen.getByLabelText('EMAIL');
      fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
      expect(emailInput.value).toBe('newemail@example.com');
    });
  
    test('updates password when input field changes', () => {
      render(<Router> <ArenaProfile /> </Router>);
      const passwordInput = screen.getByLabelText('CURRENT PASSWORD');
      fireEvent.change(passwordInput, { target: { value: 'oldpassword' } });
      expect(passwordInput.value).toBe('oldpassword');
    });
  
    test('updates new password when input field changes', () => {
      render(<Router> <ArenaProfile /> </Router>);
      const newPasswordInput = screen.getByLabelText('NEW PASSWORD');
      fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
      expect(newPasswordInput.value).toBe('newpassword');
    });
  
    test('updates confirm password when input field changes', () => {
      render(<Router> <ArenaProfile /> </Router>);
      const confirmPasswordInput = screen.getByLabelText('CONFIRM PASSWORD');
      fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
      expect(confirmPasswordInput.value).toBe('newpassword');
    });
  });