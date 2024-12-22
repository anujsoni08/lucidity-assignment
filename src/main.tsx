import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import { store } from "./store/index.ts";
import { darkTheme } from "./themes/index.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
