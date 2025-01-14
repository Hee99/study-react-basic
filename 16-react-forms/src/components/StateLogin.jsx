import { useState } from 'react';
import Input from './Input';

export default function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  // key stroke시 validation
  // const emailIsInvalid =
  //   enteredValues.email !== '' && !enteredValues.email.includes('@');

  // blur시 validation
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  const passwordIsInvalid =
    didEdit.password && enteredValues.password.trim().length < 6;

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submitted');
  }

  // function handleEmailChange(event) {
  //   setEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setPassword(event.target.value);
  // }

  function handleInputChange(ideintifier, inputValue) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [ideintifier]: inputValue,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [ideintifier]: false,
    }));
  }

  function handleInputBlur(ideintifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [ideintifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          className="no-margin"
          id="email"
          label="Email"
          type="email"
          name="email"
          value={enteredValues.email}
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          error={emailIsInvalid && 'Please enter a valid email address.'}
        />

        <Input
          className="no-margin"
          id="password"
          label="Password"
          type="password"
          name="password"
          value={enteredValues.password}
          onBlur={() => handleInputBlur('password')}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          error={passwordIsInvalid && 'Please enter a valid password.'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
