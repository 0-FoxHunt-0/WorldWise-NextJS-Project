"use client";

import { useGeolocation } from "@/hooks/useGeolocation";
import styles from "../styles/Map.module.css";
import { useCitiesContext } from "@/contexts/CitiesContext";
import { useUrlPosition } from "@/hooks/useUrlPosition";
import PositionModel from "@/models/PositionModel";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Button from "./Button";
import User from "./User";

interface MapProps {
  user: any;
  displayName: string;
}

function Map({ displayName, user }: MapProps) {
  const { cities } = useCitiesContext();
  const { position, getPosition, isLoadingPosition } = useGeolocation();
  const userPosition = useRef<PositionModel>(position);
  const { lat, lng } = useUrlPosition();
  const [center, setCenter] = useState<PositionModel>({ lat: 40, lng: 0 });
  const router = useRouter();

  useEffect(() => {
    if (lat && lng) setCenter({ lat, lng });
    else {
      getPosition().then((value) => {
        if (value !== null) {
          userPosition.current.lat = value.lat;
          userPosition.current.lng = value.lng;
        }
      });
    }
  }, [lat, lng]);

  function handleSetCenter(position: PositionModel) {
    setCenter(position);
  }

  // Calculate the distance between two points (Haversine formula)
  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  // Define the radius threshold (in kilometers) for button visibility
  const radiusThreshold = 0.75; // Adjust this value as needed

  // Calculate the distance between the current center and the user's position
  const distanceToUser = calculateDistance(
    center.lat,
    center.lng,
    userPosition.current.lat,
    userPosition.current.lng
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>{`${city.cityName}, ${city.country}`}</Popup>
          </Marker>
        ))}
        <FeatureGroup>
          <Popup>Your approximate current location</Popup>
          {userPosition.current.lat && userPosition.current.lng && (
            <>
              <Circle
                center={[userPosition.current.lat, userPosition.current.lng]}
                radius={600}
              />
              <Marker
                position={[userPosition.current.lat, userPosition.current.lng]}
              ></Marker>
            </>
          )}
        </FeatureGroup>
        <DetectClick />
        <TrackMapCenter center={center} handleSetCenter={handleSetCenter} />
      </MapContainer>
      <User displayName={displayName} user={user} />
      {distanceToUser > radiusThreshold && (
        <Button
          type="position"
          onClickHandler={() => {
            getPosition().then((value) => {
              setCenter({ lat: value.lat, lng: value.lng });
            });
            router.push("/app/cities");
          }}
        >
          {isLoadingPosition ? "Loading..." : "Go To Self"}
        </Button>
      )}
    </div>
  );
}

function DetectClick(): null {
  const router = useRouter();
  const map = useMap();

  useMapEvents({
    click: (e) => {
      map.flyTo([e.latlng.lat, e.latlng.lng]);
      router.push(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

function TrackMapCenter({
  center,
  handleSetCenter,
}: {
  center: PositionModel;
  handleSetCenter: (position: PositionModel) => void;
}): null {
  const map = useMap();

  useEffect(() => {
    map.flyTo([center.lat, center.lng], map.getZoom());
  }, [center, map]);

  useEffect(() => {
    function handleMapMoveEnd() {
      const mapCenter = map.getCenter();
      const newCenter = {
        lat: +mapCenter.lat.toFixed(4),
        lng: +mapCenter.lng.toFixed(4),
      };

      if (newCenter.lat !== center.lat || newCenter.lng !== center.lng) {
        handleSetCenter(newCenter);
      }
    }

    map.on("moveend", handleMapMoveEnd);

    return () => {
      map.off("moveend", handleMapMoveEnd);
    };
  }, [handleSetCenter, map, center]);

  return null;
}

export default Map;
