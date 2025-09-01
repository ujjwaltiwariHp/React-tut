export const asyncWrapper = async (asyncFn) => {
  try {
    const data = await asyncFn();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
