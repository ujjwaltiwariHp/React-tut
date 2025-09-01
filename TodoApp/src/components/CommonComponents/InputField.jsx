function InputField({ label, type = "text", name, value, onChange, required }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
export default InputField;
