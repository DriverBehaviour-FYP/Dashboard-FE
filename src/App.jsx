// import MapComponent from "./component/MapComponent";
import Dashboard from "./page/dashboard";
import DriverDashboard from "./page/driverDashboard";
import NavBarComponent from "./component/NavBarComponent";
import FooterComponent from "./component/FooterComponent";
import TripDashboard from "./page/tripDashboard";
import NotFound from "./page/notFound";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <div className="App light-purpal-box">
      {/* <MapComponent /> */}
      <BrowserRouter>
        <NavBarComponent />
        <main>
          <Routes>
            <Route path="/driver/all" element={<Dashboard />} />
            <Route path="/driver/:driverId" element={<DriverDashboard />} />
            <Route path="/trip/:tripId" element={<TripDashboard />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/driver/all" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
