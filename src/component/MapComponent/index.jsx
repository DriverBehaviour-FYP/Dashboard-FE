import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";

const rotateColors = ["red", "blue", "green"]; // Add more colors as needed

const getMarkerColor = (segment_id) => {
  const index = segment_id % rotateColors.length;
  return rotateColors[index];
};

const MapComponent = ({ mapData }) => {
  // console.log(gps);
  const zoom = 14; // Initial zoom level
  // const filterDataPoint = dataPoints.filter((point) => point.trip_id === 1);
  const center = mapData.reduce(
    (acc, point) => [acc[0] + point.latitude, acc[1] + point.longitude],
    [0, 0]
  );
  const averageCenter = [
    center[0] / mapData.length,
    center[1] / mapData.length,
  ];

  const createCustomIcon = (color) => {
    const markerHtmlStyles = `
      background-color: ${color};
      width: 3rem;
      height: 3rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`;

    return L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`,
    });
  };
  return (
    <div className="container white-box rounded-2 pt-2">
      {/* <h3 className="text-center">MAP</h3> */}
      <MapContainer
        center={averageCenter}
        zoom={zoom}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapData.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={createCustomIcon(getMarkerColor(point.segment_id))}
          >
            <Popup>{point.id}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
const objectPropTypes = {
  cluster: PropTypes.number,
  date: PropTypes.string,
  deviceid: PropTypes.number,
  devicetime: PropTypes.string,
  elevation: PropTypes.number,
  id: PropTypes.number,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  segment_id: PropTypes.number,
  speed: PropTypes.number,
  time: PropTypes.string,
  trip_id: PropTypes.number,
  index: PropTypes.number,
};

MapComponent.propTypes = {
  mapData: PropTypes.arrayOf(PropTypes.shape(objectPropTypes)),
};

export default MapComponent;
