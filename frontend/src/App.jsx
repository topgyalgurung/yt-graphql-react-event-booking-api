import "./App.css";
import { useState } from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import MainNavigation from "./components/Navigation/MainNavigation";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Booking";

import { AuthContext } from "./context/authContext";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

const App = () => {
  const [auth, setAuth] = useState({ token: null, userId: null });
  const login = (token, userId) => {
    setAuth({ token, userId });
  };

  const logout = () => {
    setAuth({ token: null, userId: null });
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Route>
    )
  );
  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
