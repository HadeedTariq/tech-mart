import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Providers from "./config/Providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
