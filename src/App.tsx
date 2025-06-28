import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "@/screens/login";
import HomePage from "./homePage";
import ConfirmUserPage from "./confirmUserPage";
import SignUpPage from "./screens/sign-up";
import ForgotPasswordPage from "./screens/forgot-password";
import InvoiceBuilderPage from "./screens/invoices/invoice-builder";
import Invoices from "./screens/invoices";
import { checkAuth } from "./utils";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await checkAuth();
      setAuthed(result);
      setLoading(false);
    };
    verify();
  }, []);

  if (loading) return <div>Loading...</div>; // TODO: make a nice loading page

  return authed ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirm" element={<ConfirmUserPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/invoice-builder" element={<InvoiceBuilderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
