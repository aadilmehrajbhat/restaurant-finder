import 'leaflet/dist/leaflet.css';
import { FC, ReactNode } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';

interface MapProps {
  center: [number, number];
  coordinates: [number, number, ReactNode][];
  zoom?: number;
  scrollWheelZoom?: boolean;
  className?: string;
}

const Map: FC<MapProps> = ({
  className,
  center,
  coordinates,
  zoom = 13,
  scrollWheelZoom = false,
}) => {
  return (
    <MapContainer
      className={className}
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Array.isArray(coordinates) &&
        coordinates.map(([latitude, longitude, tooltip]) => (
          <Marker
            key={`${latitude}_${longitude}`}
            icon={icon({
              iconUrl: '/map_icon.png',
              iconSize: [44, 44],
            })}
            position={[latitude, longitude]}
          >
            {tooltip && <Popup>{tooltip}</Popup>}
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
