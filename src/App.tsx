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
import { useContext, useEffect } from "react";
import Loading from "./components/Loading";
import { AuthContext } from "./contexts/AuthContextFb";
import SuperAdminLayout from "./layouts/superAdmin";
import DtLayout from "./layouts/direccionTrabajo";

export default function App() {
  const authContext = useContext(AuthContext);
  const { currentUser, currentUserAll } = authContext;
 
  useEffect(() => {}, [currentUser]);
  console.log(currentUser)
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
            ) : currentUser?.isAdmin ? (
              <>
                <Route
                  path="/admin/*"
                  element={
                    <PrivateRouteDos>
                      <AdminLayout />
                    </PrivateRouteDos>
                  }
                />

                {/* Ruta de redireccionamiento para  superAdmin */}
                <Route
                  path="/*"
                  element={<Navigate replace={true} to="/admin" />}
                />
              </>
            ) : currentUser?.isUserDt ? (
              <>
                <Route
                  path="/userDt/*"
                  element={
                    <PrivateRouteDos>
                      {/* <h1>holaa mundo</h1> */}
                      <DtLayout />
                    </PrivateRouteDos>
                  }
                />

                {/* Ruta de redireccionamiento para isUserDt */}
                <Route
                  path="/*"
                  element={<Navigate replace={true} to="/userDt" />}
                />
              </>
            ) : (
              <></>
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
