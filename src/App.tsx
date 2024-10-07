import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/screens/login";
import HomePage from "./homePage";
import ConfirmUserPage from "./confirmUserPage";
import SignUpPage from "./screens/sign-up";
import ForgotPasswordPage from "./screens/forgot-password";
import InvoiceBuilderPage from "./screens/invoice-builder";

const App = () => {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirm" element={<ConfirmUserPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/home"
          element={isAuthenticated() ? <HomePage /> : <Navigate replace to="/login" />}
        />
        <Route path="/invoice-builder" element={<InvoiceBuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
