
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Order from "./pages/order/Order";
import { CustomContext } from "./context/productContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <CustomContext>
            <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />

          <Route path="/cart" element={
            <>
              <Navbar />
              <Cart />
            </>
          } />
          <Route path="/myorder" element={
            <>
              <Navbar />
              <Order />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Navbar />
              <SignUp />
            </>
          } />
          <Route path="/signin" element={
            <>
              <Navbar />
              <SignIn />
            </>
          } />
        </Routes>

      </BrowserRouter>
    </CustomContext>
  );
}

export default App;
