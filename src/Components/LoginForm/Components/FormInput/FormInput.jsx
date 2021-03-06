import cn from "classnames";

import s from "./FormInput.module.css";

const FormInput = (props) => {
  const { label, type, name, value, isRequired, onInputChange } = props;

  return (
    <div className={s.root}>
      <input
        type={type}
        className={cn(s.input, { [s.valid]: value !== "" })}
        name={name}
        required={isRequired}
        value={value}
        onChange={(e) => onInputChange(e.target)}
      />
      <span className={s.highlight}></span>
      <span className={s.bar}></span>
      <label className={s.label}>{label}</label>
    </div>
  );
};

FormInput.defaultProps = {
  label: "",
  type: "text",
  name: "",
  value: "",
  isRequired: false,
  onInputChange: () => {},
};

export default FormInput;
