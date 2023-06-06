import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextFb";

export default function useAuth() {
  return useContext(AuthContext);
}
