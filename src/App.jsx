// import MapComponent from "./component/MapComponent";
import Dashboard from "./page/dashboard";
import DriverDashboard from "./page/driverDashboard";
import NavBarComponent from "./component/NavBarComponent";
import FooterComponent from "./component/FooterComponent";
import TripDashboard from "./page/tripDashboard";
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
            <Route path="*" element={<Navigate to="/driver/all" />} />{" "}
            {/* Redirect to "/driver/all" as default route */}
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
