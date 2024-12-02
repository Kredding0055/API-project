// frontend/src/components/SignupFormPage/SignupFormPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'; 
import './SignupForm.css';
import * as sessionActions from '../../store/session';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() =>{
  if(username.length >= 4 && password.length >= 6 && password === confirmPassword
    && firstName.length > 0 && lastName.length > 0 && email.length > 0) 
    {
    setLoginDisabled(false)
  }
  else {
    setLoginDisabled(true)
  }
  }, [username, password, confirmPassword, firstName, lastName, email])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signup-modal-container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='form-inputs-container'>
          {errors.firstName && <p>{errors.firstName}</p>}
          {errors.lastName && <p>{errors.lastName}</p>}
          {errors.email && <p>{errors.email}</p>}
          {errors.username && <p>{errors.username}</p>}
          {errors.password && <p>{errors.password}</p>}
          {errors.confirmPassword && (<p>{errors.confirmPassword}</p>)}
          <input
            className='signup-input-fields'
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className='signup-input-fields'
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className='signup-input-fields'
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='signup-input-fields'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className='signup-input-fields'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className='signup-input-fields'
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button
        className='signup-button'
        disabled={loginDisabled}
        type="submit"
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;