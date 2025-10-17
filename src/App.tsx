import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignupForm } from "./components/signForm";
import Login  from "./components/login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signForm" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
