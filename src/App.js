import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import DashboardScreen from "./DashboardScreen";
import "./App.css";

const App = () => {
  return (
    // <div className="app">
    //   <LoginScreen />
    //   <SignUpScreen />
    // </div>
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/" element={<LoginScreen />} />
        {/* <Route path="/dashboard/:uid&:username" element={<DashboardScreen />} /> */}
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
