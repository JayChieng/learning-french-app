import "./AuthField.scss";

type AuthFieldProps = {
  label: string;
  icon: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

function AuthField({
  label,
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: AuthFieldProps) {
  return (
    <label className="auth-field">
      <span className="auth-field__label">{label}</span>
      <div className="auth-field__input">
        <img src={icon} alt="" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </label>
  );
}

export default AuthField;
