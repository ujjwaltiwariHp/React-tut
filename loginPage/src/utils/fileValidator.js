export const validateResumeFile = (file) => {
  if (!file) return "File is required.";
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowedTypes.includes(file.type)) {
    return "Only PDF and DOCX files are allowed.";
  }
  if (file.size > 5 * 1024 * 1024) {
    return "File size must be less than 5MB.";
  }
  return null;
};
