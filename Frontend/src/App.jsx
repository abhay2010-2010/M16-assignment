
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routre/AppRouter";

function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}

export default App;
