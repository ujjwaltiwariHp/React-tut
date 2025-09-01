import apiClient from "../api/apiClient";
import { asyncWrapper } from "../utils/asyncWrapper";
import { getErrorMessage } from "../utils/errorHandler";

export const submitCandidateForm = async (formData) => {
  const result = await asyncWrapper(() =>
    apiClient.post("/register", formData,{
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

  if (!result.success) {
    return { success: false, message: getErrorMessage(result.error) };
  }
  return { success: true, data: result.data.data };
};
