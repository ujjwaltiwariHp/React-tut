const asyncWrapper = (asyncFn) => {
  return async (...args) => {
    try {
      const data = await asyncFn(...args);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  };
};

export default asyncWrapper;
