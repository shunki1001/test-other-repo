import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Appointment from "./views/Appointment";
import NewAppointment from "./views/NewAppointment";
import Home from "./views/Home";
import Signin from "./views/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
          <Route path="appointment" element={<NewAppointment />} />
          {/* <Route path="appointment" element={<Appointment />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
