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
        {!auth.token && (
          <Route path="/bookings" element={<Navigate to="/auth" exact />} />
        )}

        {/* Redirect to /events if logged in */}
        {auth.token && <Route path="/" element={<Navigate to="/events" />} />}

        {/* Redirect /auth to /events if logged in */}
        {auth.token && (
          <Route path="/auth" element={<Navigate to="/events" />} />
        )}

        {/* Events page is always available */}
        <Route path="/events" element={<EventsPage />} />

        {/* Bookings page is available only if logged in */}
        {auth.token && <Route path="/bookings" element={<BookingsPage />} />}
        {/* Auth route should be available only if user is not logged in */}
        {!auth.token && <Route path="/auth" element={<AuthPage />} />}
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
