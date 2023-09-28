"use client";

import { useGeolocation } from "@/hooks/useGeolocation";
import styles from "../styles/Map.module.css";

import { useCitiesContext } from "@/contexts/CitiesContext";
import PositionModel from "@/models/PositionModel";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LocationNotFoundToast } from "@/lib/exceptions";

interface MapProps {
  cityId: string;
  searchParams: ReadonlyURLSearchParams;
}

function Map({ cityId, searchParams }: MapProps) {
  const { cities } = useCitiesContext();
  const { position, getPosition } = useGeolocation();
  const lat: number = +searchParams.get("lan");
  const lng: number = +searchParams.get("lng");
  const [center, setCenter] = useState<PositionModel>({ lat: 40, lng: 0 });

  useEffect(() => {
    if (lat && lng) setCenter({ lat, lng });
    else {
      getPosition().then((value) => setCenter(value));
    }
  }, [lat, lng]);
  console.log(position, center);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>{`${city.cityName}, ${city.country}`}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={center} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: PositionModel }): null {
  const map = useMap();
  map.setView([position.lat, position.lng]);
  return null;
}

export default Map;
