import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile/>} />
            </Route>
            <Route path="/offers" element={<Offers/>} />
            <Route path="/sign-in" element={<SignIn/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/category/:categoryName/:listingId" element={<Listing/>} />
            <Route path="/create-listing" element={<PrivateRoute/>}>
              <Route path="/create-listing" element={<CreateListing />} />
            </Route>
            <Route path="/edit-listing" element={<PrivateRoute/>}>
              <Route path="/edit-listing/:listingId" element={<EditListing />} />
            </Route>
        </Routes>
        
      </Router>
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </>
  );
}

// https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg



export default App;
