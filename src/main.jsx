import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast"; // Импортируем Toaster
import App from "./components/App";
import { store, persistor } from "./redux/store";
import "modern-normalize";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" reverseOrder={false} />{" "}
          {/* Добавляем Toaster */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
