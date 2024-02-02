// import MapComponent from "./component/MapComponent";
import Dashboard from "./page/dashboard";
import DriverDashboard from "./page/driverDashboard";
import NavBarComponent from "./component/NavBarComponent";
import FooterComponent from "./component/FooterComponent";
import TripDashboard from "./page/tripDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App light-purpal-box">
      {/* <MapComponent /> */}
      <BrowserRouter>
        <NavBarComponent />
        <main>
          <Routes>
            <Route path="/driver/all" element={<Dashboard />} />
            <Route path="/driver/116" element={<DriverDashboard />} />
            <Route path="/trip/1145" element={<TripDashboard />} />
            {/*<Route path="/about" element={<Dashboard />} />
            <Route path="/contact" element={<Dashboard />} /> */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
