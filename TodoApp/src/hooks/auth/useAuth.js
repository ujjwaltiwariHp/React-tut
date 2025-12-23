import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout } from "../../store/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);

  const login = (credentials) => dispatch(authenticate(credentials));
  const signout = () => dispatch(logout());

  return { ...auth, login, signout };
}
