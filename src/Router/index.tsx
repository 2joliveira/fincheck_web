import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Dashboard, Signin, SignUp } from "../pages";
import { AuthLayout } from "../layouts/AuthLayout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Signin />} />
            <Route path="/register" element={<SignUp />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
