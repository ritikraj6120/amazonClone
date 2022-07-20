import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from './AllRoutes';
function App() {
  return (    
      <Router>
      <ToastContainer/>
      <AllRoutes/>
      </Router>
  );
}

export default App;