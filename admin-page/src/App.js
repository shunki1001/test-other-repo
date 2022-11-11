import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./views/Home";
import Signin from "./views/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
