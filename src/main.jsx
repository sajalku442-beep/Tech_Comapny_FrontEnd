import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";


const persister = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>
);
