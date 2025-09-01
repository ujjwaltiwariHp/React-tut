function FileUpload({ onChange, file }) {
  return (
    <label className="flex flex-col items-center justify-center w-full h-32 border-2
    border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
      <input
        type="file"
        name="resume_url"
        accept=".pdf,.docx"
        onChange={(e) => onChange(e)}
        required
      />
      <span className="text-gray-500">
        {file ? file.name : "Drag your resume here or click to upload"}
      </span>
      <small className="text-gray-400 text-sm">
        Acceptable: PDF, DOCX (5MB max)
      </small>
    </label>
  );
}
export default FileUpload;
