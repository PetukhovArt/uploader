import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@/assets/styles/index.scss";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/app/store.ts";
import { App } from "@/app/App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
