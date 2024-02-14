import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";
const rotateColors = ["red", "blue", "green", "black"]; // Add more colors as needed
const clusterLabels = ["Agressive", "Normal", "safe"];
const getMarkerColor = (cluster_id) => {
  const index = Number(cluster_id);
  return rotateColors[index];
};

const MapComponent = ({ mapData, splitPoint }) => {
  // console.log(gps);
  const zoom = 13.2; // Initial zoom level
  // const filterDataPoint = dataPoints.filter((point) => point.trip_id === 1);
  const center = mapData.reduce(
    (acc, point) => [acc[0] + point.latitude, acc[1] + point.longitude],
    [0, 0]
  );
  const averageCenter = [
    center[0] / mapData.length,
    center[1] / mapData.length,
  ];
  const segmentCenters = {};
  mapData.forEach((point) => {
    if (
      !Object.prototype.hasOwnProperty.call(segmentCenters, point.segment_id)
    ) {
      segmentCenters[point.segment_id] = {
        latitudeSum: 0,
        longitudeSum: 0,
        count: 0,
        cluster_id: point.cluster,
      };
    }

    segmentCenters[point.segment_id].latitudeSum += point.latitude;
    segmentCenters[point.segment_id].longitudeSum += point.longitude;
    segmentCenters[point.segment_id].count++;
  });

  // Calculate average center for each segment
  for (const segmentId in segmentCenters) {
    const { latitudeSum, longitudeSum, count } = segmentCenters[segmentId];
    segmentCenters[segmentId].averageCenter = [
      latitudeSum / count,
      longitudeSum / count - 0.001,
    ];
  }
  const createCustomIcon = (color) => {
    const markerHtmlStyles = `
      background-color: ${color};
      width: 1rem;
      height: 1rem;
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

  const createTextIcon = (cluster_id) =>
    L.divIcon({
      html: `<div class="text-marker"><p>${
        clusterLabels[Number(cluster_id)]
      }</p></div>`,
      className: "text-marker",
      labelAnchor: [-6, 0],
      iconAnchor: [0, 0],
    });
  return (
    <div className="container white-box rounded-2">
      <div className="row pr-3 pb-2 pt-1">
        <div className="col-2"></div>
        <div className="col-3">
          <div className="legend-item">
            <span className="circle red"></span>
            <span className="legend-text">Agressive</span>
          </div>
        </div>
        <div className="col-3">
          <div className="legend-item">
            <span className="circle" style={{ backgroundColor: "blue" }}></span>
            <span className="legend-text">Normal</span>
          </div>
        </div>
        <div className="col-3">
          <div className="legend-item">
            <span
              className="circle"
              style={{ backgroundColor: "green" }}
            ></span>
            <span className="legend-text">Safe</span>
          </div>
        </div>
      </div>
      <MapContainer
        center={averageCenter}
        zoom={zoom}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.keys(segmentCenters).map((segmentId) => (
          <Marker
            key={segmentId}
            position={segmentCenters[segmentId].averageCenter}
            icon={createTextIcon(segmentCenters[segmentId].cluster_id)}
          />
        ))}
        {mapData.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={createCustomIcon(getMarkerColor(point.cluster))}
          >
            <Popup>
              <p>
                {"("}
                {point.latitude}
                {" , "}
                {point.latitude}
                {")"}
              </p>
              <p>Speed : {point.speed}</p>
              <p>Time : {point.time}</p>
            </Popup>
          </Marker>
        ))}
        {splitPoint.map((point, index) => (
          <Marker
            key={index}
            position={[point.latitude, point.longitude]}
            icon={createCustomIcon("black")}
          >
            <Popup>
              <p>
                {"("}
                {point.latitude}
                {" , "}
                {point.latitude}
                {")"}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
const objectPropTypes1 = {
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
const objectPropTypes2 = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

MapComponent.propTypes = {
  mapData: PropTypes.arrayOf(PropTypes.shape(objectPropTypes1)),
  splitPoint: PropTypes.arrayOf(PropTypes.shape(objectPropTypes2)),
};

export default MapComponent;
