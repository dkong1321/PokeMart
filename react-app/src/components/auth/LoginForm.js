import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';
import "./login__form.css"
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      return
    }
    console.log(user)
    history.push('/products')

  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "propaneprince@aa.io"
    const demoPassword = "password"
    dispatch(login(demoEmail, demoPassword));
    console.log(user)
    history.push('/products')
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/products' />;
  }

  return (
    <div className='main__login__form__container'>
      <div className='modal__form__heading'>Login In</div>
      <form  className="login__form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login__email__input'>
          <label for="email">Email</label>
          <input id="email" name='email' type='text' placeholder='Email' value={email} onChange={updateEmail}
          />
        </div>
        <div className='login__password__input'>
          <label for="password">Password</label>
          <input id="password" name='password' type='password' placeholder='Password' value={password} onChange={updatePassword}
          />
        </div>
        <button className='login__button' type='submit'>Login</button>
      </form>
      <form onSubmit={demoLogin}>
        <button className='demo__button' type='submit'>Demo User</button>
      </form>
    </div>
  );
};

export default LoginForm;
