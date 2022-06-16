import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';

const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [usernameError, setUsernameError] = useState([])
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [repeatPasswordError, setRepeatPasswordError] = useState([]);

  const user = useSelector(state => state.session.user);
  const users = useSelector(state => state.users)
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    let usernameExists = false
    Object.values(users).map((user)=>{
      if (username.toLowerCase() === user.username.toLowerCase()){
        usernameExists = true
      }
    })
    let emailExists=false
    Object.values(users).map((user)=>{
      if (email.toLowerCase() === user.email.toLowerCase()){
        emailExists = true
      }
    })

    const usernameErrorValidation = []
    const emailErrorValidation = []
    const passwordErrorValidation = []
    const repeatPasswordErrorValidation = []


    if(!username.length){
      usernameErrorValidation.push("Please enter a username")
    }
    if(username.length > 40){
      usernameErrorValidation.push("Username cannot be more than 40 characters")
    }
    if(usernameExists){
      usernameErrorValidation.push("Username already exists (case insensitive)")
    }

    if(!email.length){
      emailErrorValidation.push("Please enter a email")
    }
    if(email.length > 40){
      emailErrorValidation.push("Email cannot be more than 40 characters")
    }
    if(emailExists){
      emailErrorValidation.push("Email already exists")
    }
    if(!password.length){
      passwordErrorValidation.push("Please enter a password")
    }
    if(password.length > 40){
      passwordErrorValidation.push("Password cannot be more than 40 characters")
    }
    if (password!==repeatPassword){
      repeatPasswordErrorValidation.push("Passwords do not match")
    }


    if (usernameErrorValidation.length || emailErrorValidation.length ||  passwordErrorValidation.length || repeatPasswordErrorValidation.length) {
      setUsernameError(usernameErrorValidation)
      setEmailError(emailErrorValidation)
      setPasswordError(passwordErrorValidation)
      setRepeatPasswordError(repeatPasswordErrorValidation)
      return
    }
    // $dk
    dispatch(signUp(username, email, password))
    dispatch(login(email,password))
    setShowModal(false)
    history.push('/products')

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/products' />;
  }

  return (
    <div>
      <div className='modal__form__heading'>Sign Up Today!</div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          {usernameError ? <div>{usernameError}</div> : <></>}
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          {emailError ? <div>{emailError}</div> : <></>}
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          {passwordError ? <div>{passwordError}</div> : <></>}
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          {repeatPasswordError ? <div>{repeatPasswordError}</div> : <></>}
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
