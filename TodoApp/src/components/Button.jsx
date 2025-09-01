function Button({ label, loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 font-semibold"
    >
      {loading ? "Please wait..." : label}
    </button>
  );
}
export default Button;
