import { X, User, Mail, Calendar, Cog, Phone, Briefcase } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfileThunk } from "../../store/slices/authSlice";

function UserProfile({ onClose }) {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfileThunk());
    }
  }, [dispatch, user]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">User Profile</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400
           to-red-400 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {getInitials(user?.name)}
          </div>
          <h4 className="text-lg font-semibold text-white">{user?.name || "User"}</h4>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50">
            <Mail className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-300">{user?.email || "No email provided"}</span>
          </div>

          {user?.phone && (
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50">
              <Phone className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">{user.phone}</span>
            </div>
          )}

          {user?.experience && (
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">{user.experience} years experience</span>
            </div>
          )}

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50">
            <Calendar className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">Joined {formatJoinDate(user?.createdAt)}</span>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-gradient-to-r
           from-indigo-500 to-purple-600 text-white hover:scale-105 transition-all">
            <Cog className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;