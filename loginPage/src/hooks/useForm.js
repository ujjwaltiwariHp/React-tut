import { useState } from "react";

export default function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const val = type === "file" ? files?.[0] ?? null : value;
    setValues((v) => ({ ...v, [name]: val }));
  };

  const validate = (rules = {}) => {
    const errs = {};
    Object.entries(rules).forEach(([field, isRequired]) => {
      if (isRequired && (values[field] === "" || values[field] == null)) {
        errs[field] = `${field} is required`;
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e, rules) => {
    e.preventDefault();
    if (validate(rules)) onSubmit(values, { reset });
  };

  const reset = () => setValues(initialValues);

  return { values, errors, handleChange, handleSubmit, reset, setValues };
}
