import App from "@/App";
import "@/index.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@contexts/AuthContext";
import theme from "@theme/theme";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
    ,
  </ChakraProvider>
);
