import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logout, getUserProfileThunk } from "../store/slices/authSlice";
import { LogOut, User, Cog, Bell } from "lucide-react";
import UserProfile from "./UserProfile";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfileThunk());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800
       to-gray-900 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                TodoMaster
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl bg-gray-800/50 text-gray-300 hover:text-white
               hover:bg-gray-700/50 transition-all duration-200">
                <Bell className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 rounded-xl bg-gradient-to-r from-indigo-500
                 to-purple-600 text-white hover:scale-105 transition-all duration-200 relative"
                title={user?.name || "User Profile"}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  {getInitials(user?.name)}
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r
                 from-pink-500 to-red-500 text-white hover:scale-105 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}

export default Header;