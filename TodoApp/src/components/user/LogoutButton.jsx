import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
