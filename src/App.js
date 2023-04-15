import './App.css';
import { BrowserRouter} from "react-router-dom";
import RouteRender from "./core/route-render";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="text-center mt-5">
      <ToastContainer/>
      
      <BrowserRouter basename={'/'}>

      <RouteRender/>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
