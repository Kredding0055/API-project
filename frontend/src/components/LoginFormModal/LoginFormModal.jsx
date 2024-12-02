// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState, useEffect, useCallback } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'; 
import './LoginFormModal.css';


function LoginFormModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  const validateLogin = useCallback(() => {
    if(credential.length >= 4 && password.length >= 6) {
      setLoginDisabled(false)
    }
    else {
      setLoginDisabled(true)
    }
  }, [credential, password, setLoginDisabled]);

  useEffect(() => {
    validateLogin();
  }, [validateLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  // const demoUserLogin = () => {
    
  // }
  
  return (
    <div className='login-modal-container'>
      <h1>Log In</h1>
      {errors && (
        <div className="error-message">
          {Object.keys(errors).map((key, index) => (
          <p key={index}>{errors[key]}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
          <input
            className='input-fields'
            type="text"
            placeholder='Username or Email'
            value={credential}
            onChange={(e) => {setCredential(e.target.value); validateLogin()}}
            required
          />
          <br/>
          <br/>
          <input
            className='input-fields'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => {setPassword(e.target.value); validateLogin()}}
            required
          />
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <br/>
        <br/>
        <button
        className='login-button'
        type="submit"
        disabled={loginDisabled}
        >Log In</button>
      </form>
        <br/>
      <button className='demo-button'>Demo User</button>
    </div>
  );
}

export default LoginFormModal;