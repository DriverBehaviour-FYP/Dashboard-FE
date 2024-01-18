import { React } from "react";
// import MapComponent from "./component/MapComponent";
import Dashboard from "./page/dashboard";
import NavBarComponent from "./component/NavBarComponent";
import FooterComponent from "./component/FooterComponent";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <MapComponent /> */}
      <BrowserRouter>
        <NavBarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/summary" element={<Dashboard />} />
            <Route path="/search" element={<Dashboard />} />
            <Route path="/about" element={<Dashboard />} />
            <Route path="/contact" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
