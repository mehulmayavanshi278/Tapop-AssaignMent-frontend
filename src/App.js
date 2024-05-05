import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import tokenHelper from "./Helper/tokenHelper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={tokenHelper.get() ? (
    <Navigate to="/profile" />
  )  : <SignUpPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
