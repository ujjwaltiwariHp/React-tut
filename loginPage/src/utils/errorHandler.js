// src/utils/errorHandler.js
export const getErrorMessage = (error) => {
  const status = error?.response?.status;

  switch (status) {
    case 400:
      return "Invalid input. Please check again.";
    case 401:
      return "Unauthorized. Please login.";
    case 403:
      return "Access denied.";
    case 404:
      return "Resource not found.";
    case 500:
      return "Server error. Try again later.";
    default:
      return "Something went wrong.";
  }
};
