import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/Auth";
import "@assets/css/App.css";
import { avatarAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import AdminLayout from "@layouts/admin";
import AuthLayout from "@layouts/auth";
import Error404Page from "@pages/Error404Page/Error404Page";

// import FaenasPage from "./pages/Faenas/FaenasPage";
// import Login from "./pages/login/LoginPage";
// import { SuperUserPage } from "./pages/SuperUser/SuperUserPage";
// import { DetallesEmpresa } from "./pages/SuperUser/DetallesEmpresa";
// import UsuarioPage from "./pages/Usuarios/Usuario/UsuarioPage";
// import UsuariosPage from "./pages/Usuarios/UsuariosPage";
// import VehiculosPage from "./pages/Vehiculos/VehiculosPage";
// import PrivateRoute from "./routes/PrivateRoute";
// import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="login" element={<PublicRoute componente={Login} />} />
    //     <Route path="vehiculos" element={<PublicRoute permisos={["vendedor"]} componente={VehiculosPage} />} />
    //     <Route path="faenas" element={<PublicRoute permisos={["vendedor"]} componente={FaenasPage} />} />
    //     <Route path="usuarios" element={<PrivateRoute permisos={["vendedor"]} componente={UsuariosPage} />} />
    //     {/* <Route path="usuarios/:id" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPage} />} /> */}
    //     <Route path="usuarios/:idEmpresa/:id" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPage} />} />
    //     <Route path="*" element={<Error404Page />} />
    //   </Routes>

    // </BrowserRouter>

    <BrowserRouter>
      <Routes>
        <Route path={`/auth/*`} element={<AuthLayout />} />
        <Route path={`/admin/*`} element={<AdminLayout />} />
        <Route path="/" element={<Navigate replace={true} to="auth" />} />

        {/* <Route path="vehiculos" element={<PrivateRoute permisos={["vendedor"]} componente={VehiculosPage} />} />
        <Route path="faenas" element={<PrivateRoute permisos={["vendedor"]} componente={FaenasPage} />} />
        <Route path="usuarios" element={<PrivateRoute permisos={["vendedor"]} componente={UsuariosPage} />} />
        {/* <Route path="usuarios/:id" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPage} />} /> */}
        {/* <Route path="usuarios/:idEmpresa/:id" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPage} />} /> */}

        {/* SuperAdmin RUTAS */}
        {/* <Route path="empresas" element={<PrivateRoute permisos={["vendedor"]} componente={SuperUserPage} />} />
        <Route path="empresas/:id" element={<PrivateRoute permisos={["vendedor"]} componente={DetallesEmpresa} />} />
        <Route path="empresas/:id/usuarios" element={<PrivateRoute permisos={["vendedor"]} componente={UsuariosPage} />} />
        <Route path="empresas/:id/faenas" element={<PrivateRoute permisos={["vendedor"]} componente={FaenasPage} />} />
        <Route path="empresas/:id/vehiculos" element={<PrivateRoute permisos={["vendedor"]} componente={VehiculosPage} />} /> */}

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
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
