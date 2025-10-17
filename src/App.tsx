import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignupForm } from "./components/signForm";
import Login from "./components/login";
import { ProductList } from "./components/productList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signForm" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;