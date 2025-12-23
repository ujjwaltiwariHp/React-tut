import {apiClient }from "../index";
import { asyncWrapper, getErrorMessage } from "../../utils/index";


const registerUser = async (formData) => {
  const result = await asyncWrapper(() =>
    apiClient.post("/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
  if (!result.success) return { success: false, message: getErrorMessage(result.error) };
  return { success: true, data: result.data?.data ?? result.data };
};
export default registerUser;