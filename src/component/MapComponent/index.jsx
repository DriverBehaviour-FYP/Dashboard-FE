import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import dataPoints from "../../data/trip-gps.json";
import PropTypes from "prop-types";

const rotateColors = ["red", "blue", "green", "black"]; // Add more colors as needed

const getMarkerColor = (segment_id) => {
  const index = segment_id % rotateColors.length;
  return rotateColors[index];
};

const MapComponent = ({ gps }) => {
  const zoom = 14; // Initial zoom level

  // const dataPoints = [
  //   {
  //     id: 1,
  //     latitude: 51.505,
  //     longitude: -0.09,
  //     name: "Point 1",
  //     segment_id: 1,
  //     trip_id: 1,
  //   },
  //   {
  //     id: 2,
  //     latitude: 51.51,
  //     longitude: -0.1,
  //     name: "Point 2",
  //     segment_id: 2,
  //     trip_id: 1,
  //   },
  //   {
  //     id: 3,
  //     latitude: 51.515,
  //     longitude: -0.11,
  //     name: "Point 3",
  //     segment_id: 3,
  //     trip_id: 1,
  //   },
  //   {
  //     id: 4,
  //     latitude: 51.52,
  //     longitude: -0.12,
  //     name: "Point 4",
  //     segment_id: 4,
  //     trip_id: 1,
  //   },
  //   {
  //     id: 5,
  //     latitude: 51.525,
  //     longitude: -0.13,
  //     name: "Point 5",
  //     segment_id: 5,
  //     trip_id: 1,
  //   },
  //   {
  //     id: 6,
  //     latitude: 51.53,
  //     longitude: -0.14,
  //     name: "Point 6",
  //     segment_id: 6,
  //     trip_id: 2,
  //   },
  //   {
  //     id: 7,
  //     latitude: 51.535,
  //     longitude: -0.15,
  //     name: "Point 7",
  //     segment_id: 7,
  //     trip_id: 2,
  //   },
  //   {
  //     id: 8,
  //     latitude: 51.54,
  //     longitude: -0.16,
  //     name: "Point 8",
  //     segment_id: 8,
  //     trip_id: 2,
  //   },
  //   {
  //     id: 9,
  //     latitude: 51.545,
  //     longitude: -0.17,
  //     name: "Point 9",
  //     segment_id: 9,
  //     trip_id: 2,
  //   },
  //   {
  //     id: 10,
  //     latitude: 51.55,
  //     longitude: -0.18,
  //     name: "Point 10",
  //     segment_id: 10,
  //     trip_id: 2,
  //   },
  // ];
  const filterDataPoint = dataPoints.filter((point) => point.trip_id === 1);
  // console.log(gps);
  // console.log("xxx");
  // console.log(filterDataPoint);
  const center = filterDataPoint.reduce(
    (acc, point) => [acc[0] + point.latitude, acc[1] + point.longitude],
    [0, 0]
  );
  const averageCenter = [
    center[0] / filterDataPoint.length,
    center[1] / filterDataPoint.length,
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
    <div className="container white-box rounded-2 mt-2 pt-2">
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
        {filterDataPoint.map((point) => (
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
};

MapComponent.propTypes = {
  gps: PropTypes.arrayOf(PropTypes.shape(objectPropTypes)),
};

export default MapComponent;
