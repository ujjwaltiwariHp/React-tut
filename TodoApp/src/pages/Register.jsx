import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../store/slices/authSlice";
import { validateResumeFile } from "../utils/fileValidator";
import { useNavigate } from "react-router-dom";
import { Mail, User, Phone, FileText, Briefcase, Upload } from "lucide-react";

const HangingPandaLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 56.152 56.152">
    <rect width="56.152" height="56.152" rx="14" fill="#ee5657" />
    <text x="12" y="38" fontSize="28" fontWeight="bold" fill="#fff">HP</text>
  </svg>
);

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resume_url: null,
  });
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error: authError } = useSelector((s) => s.auth);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume_url") {
      const file = files[0];
      if (!file) return;

      const fileError = validateResumeFile(file);
      if (fileError) {
        setError(fileError);
        return;
      }
      setForm((prev) => ({ ...prev, resume_url: file }));
      setFileName(file.name);
      setError("");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });
    dispatch(registerUserThunk(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const renderInput = (name, type, placeholder, icon) => (
    <div className="relative mb-3">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-gray-600 bg-gray-900/70 py-4 pl-12 pr-4 text-gray-100
         placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-2">
      <div
        className="
        w-full max-w-2xl
        bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800
        rounded-3xl
        p-10
        shadow-2xl
        border border-gray-800
        flex flex-col items-center
        mb-4
        ring-2 ring-pink-500/20
        transition-all
      "
        style={{
          boxShadow:
            "0 8px 40px 0 rgba(183, 29, 255, 0.2), 0 1.5px 40px 0 rgba(255, 45, 110, 0.2)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-2 flex items-center justify-center">
            <HangingPandaLogo />
          </div>
          <span className="font-extrabold text-3xl md:text-4xl tracking-wide text-white">
            HANGING PANDA
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
          Apply to Hanging Panda
        </h2>
        <p className="text-gray-300 text-center mb-7 text-base font-medium">
          Provide your details and resume. We review every application.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full"
        >
          {renderInput("name", "text", "Full Name", <User className="w-6 h-6" />)}
          {renderInput("email", "email", "Email Address", <Mail className="w-6 h-6" />)}
          {renderInput("phone", "tel", "Phone", <Phone className="w-6 h-6" />)}
          {renderInput("experience", "number", "Experience (years)", <Briefcase className="w-6 h-6" />)}

          {/* Enhanced Resume Upload Section */}
          <div className="col-span-1 md:col-span-2 mb-2">
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed
             border-gray-600 rounded-xl bg-gray-900/70 p-6 hover:border-pink-400 transition cursor-pointer">
              <input
                id="resume-upload"
                type="file"
                name="resume_url"
                accept=".pdf,.docx"
                onChange={handleChange}
                required
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FileText className="w-10 h-10 text-pink-400 mb-3" />
              <p className="text-gray-300 text-sm mb-1">
                {fileName ? (
                  <span className="text-pink-300 font-medium">{fileName}</span>
                ) : (
                  "Drag & drop or click to upload your resume"
                )}
              </p>
              <label
                htmlFor="resume-upload"
                className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-400
                 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
              >
                <Upload className="w-4 h-4" /> Choose File
              </label>
            </div>
            <p className="text-xs text-pink-100 mt-2">
              * Acceptable file types: PDF, DOCX (5MB max)
            </p>
          </div>

          {(error || authError) && (
            <p className="text-pink-400 text-sm font-medium col-span-2 text-center shadow-sm">
              {error || authError}
            </p>
          )}
          <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
            <Button
              label={
                loading ? (
                  "Submitting..."
                ) : (
                  <span>
                    Submit <span className="ml-2">&#8594;</span>
                  </span>
                )
              }
              loading={loading}
              className="bg-gradient-to-r from-pink-500 via-red-400 to-pink-600
               text-white font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105
               transition-all text-lg flex items-center gap-2"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
