import { BrowserRouter } from "react-router-dom";
import { CustomRoutes } from "./routes";
import { AuthUserProvider } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthUserProvider>
        <ToastContainer />

        <CustomRoutes />
      </AuthUserProvider>
    </BrowserRouter>
  );
}

export default App;
