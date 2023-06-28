import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "@assets/css/App.css";
import { avatarAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

import AdminLayout from "@/layouts/admin";
import AuthLayout from "@/layouts/auth";
import { PrivateRouteDos } from "@navigation/PrivateRoute";
import { AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";
import SuperAdminLayout from "./layouts/superAdmin";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContextFb";




export default function App() {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;

  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace={true} to="/auth" />} />

          {currentUser?.isSuperAdmin ? (
            <>
              <Route
                path="/superAdmin/*"
                element={
                  <PrivateRouteDos>
                    <SuperAdminLayout />
                  </PrivateRouteDos>
                }
              />

              {/* Ruta de redireccionamiento para superAdmin */}
              <Route
                path="/*"
                element={<Navigate replace={true} to="/superAdmin" />}
              />
            </>
          ) : (
            <>
              <Route
                path="/admin/*"
                element={
                  <PrivateRouteDos>
                    <AdminLayout />
                  </PrivateRouteDos>
                }
              />

              {/* Ruta de redireccionamiento para no superAdmin */}
              <Route
                path="/*"
                element={<Navigate replace={true} to="/admin" />}
              />
            </>
          )}

          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/load" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  badge: {
    bg: "gray.500",
    border: "2px solid",
  },
  excessLabel: {
    bg: "gray.800",
    color: "white",
    border: "2px solid",

    // let's also provide dark mode alternatives
    _dark: {
      bg: "gray.400",
      color: "gray.900",
    },
  },
});

// Defining a custom variant
const variantRoundedSquare = definePartsStyle({
  badge: {
    bg: "gray.500",
    border: "2px solid",
  },
  container: {
    borderRadius: "0.7em",
  },
  excessLabel: {
    bg: "gray.800",
    color: "white",
    borderRadius: "0.7em",
    border: "2px solid",

    // let's also provide dark mode alternatives
    _dark: {
      bg: "gray.400",
      color: "gray.900",
    },
  },
});

const variants = {
  roundedSquare: variantRoundedSquare,
};

const superLg = defineStyle({
  width: 40,
  height: 40,
  fontSize: "6xl",
  borderWidth: "6px",
});

const sizes = {
  superLg: definePartsStyle({
    container: superLg,
    excessLabel: superLg,
    badge: {
      width: 8,
      height: 8,
      borderWidth: "6px",
    },
  }),
};

export const avatarTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});
