import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./lib/i18n/config";
import { TodoProvider } from "./contexts/TodoContext";
import { I18nProvider } from "./contexts/I18nContext";
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider>
        <I18nProvider>
          <TodoProvider>
            <App />
          </TodoProvider>
        </I18nProvider>
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
