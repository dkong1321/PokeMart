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
    // history.push('/products')

  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "propaneprince@aa.io"
    const demoPassword = "password"
    dispatch(login(demoEmail, demoPassword));
    // history.push('/products')
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
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className="input__error">{error}</div>
          ))}
        </div>
      <form  className="login__form" onSubmit={onLogin}>
        <div >
          <label for="email" className='input__label'>Email</label>
          <input id="email" className="login__email__input" name='email' type='text' placeholder='Email' value={email} onChange={updateEmail}
          />
        </div>
        <div>
          <label for="password" className='input__label'>Password</label>
          <input id="password" className="login__password__input" name='password' type='password' placeholder='Password' value={password} onChange={updatePassword}
          />
        </div>
        <button className='login__form__buttons' type='submit'>Login</button>
      </form>
      <form onSubmit={demoLogin}>
        <button className='demo__form__buttons' type='submit'>Demo User</button>
      </form>
    </div>
  );
};

export default LoginForm;
