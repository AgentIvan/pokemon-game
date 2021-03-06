import s from "./Button.module.css";

const Button = ({ children }) => {
  return <button className={s.button}>{children}</button>;
};

export default Button;
