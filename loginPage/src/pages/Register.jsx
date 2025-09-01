import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import FileUpload from "../components/FileUpload";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../store/slices/authSlice";
import { validateResumeFile } from "../utils/fileValidator";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resume_url: null,
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error: authError } = useSelector((s) => s.auth);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume_url") {
      const file = files[0];
      const fileError = validateResumeFile(file);
      if (fileError) {
        setError(fileError);
        return;
      }
      setForm((prev) => ({ ...prev, resume_url: file }));
      setError("");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    dispatch(registerUserThunk(data));
  };

    useEffect(() => {
     if (isAuthenticated) {
    navigate("/home", { replace: true });
     }
   }, [isAuthenticated, navigate]);


  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Apply Now</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
        <InputField label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        <InputField label="Experience" name="experience" value={form.experience} onChange={handleChange} required />

        <div className="col-span-2">
          <FileUpload onChange={handleChange} file={form.resume_url} />
        </div>

        {(error || authError) && (
          <p className="text-red-600 text-sm font-medium col-span-2">{error || authError}</p>
        )}

        <div className="col-span-2">
          <Button label={loading ? "Submitting..." : "Submit ➝"} loading={loading} />
        </div>
      </form>
    </div>
  );
}

export default Register;
