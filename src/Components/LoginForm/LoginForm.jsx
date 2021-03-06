import { useState } from "react";

import FormInput from "./Components/FormInput";
import Button from "../Button/Button";

import s from "./LoginForm.module.css";

const LoginForm = ({ onFormSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setSignUp] = useState(false);

  const handleInputsChange = ({ name, value }) => {
    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onFormSubmit({ email, password, isSignUp });
  };

  const handleAuthTypeClick = () => {
    setSignUp((prevState) => !prevState);
  };

  const btnLabel = isSignUp ? "Sign up" : "Sign in";
  const authTypeLabel = isSignUp ? "Login?" : "Register?";

  return (
    <form onSubmit={handleFormSubmit}>
      <FormInput
        label="Email"
        name="email"
        value={email}
        isRequired
        onInputChange={handleInputsChange}
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={password}
        isRequired
        onInputChange={handleInputsChange}
      />
      <div className={s.loginFormControl}>
        <Button>{btnLabel}</Button>
        <div className={s.authTypeChange} onClick={handleAuthTypeClick}>
          {authTypeLabel}
        </div>
      </div>
    </form>
  );
};

LoginForm.defaultProps = {
  onFormSubmit: () => {},
};

export default LoginForm;
