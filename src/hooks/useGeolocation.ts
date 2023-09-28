"use client";

import { useState } from "react";
import { LocationNotFoundToast } from "@/lib/exceptions";
import PositionModel from "@/models/PositionModel";

export function useGeolocation() {
  const [position, setPosition] = useState<PositionModel>(new PositionModel());

  function getPosition(): Promise<PositionModel> {
    if (!navigator.geolocation)
      LocationNotFoundToast("Location was not provided or not allowed.");

    return new Promise<PositionModel>((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const newPosition = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setPosition(newPosition);
            resolve(newPosition);
          },
          (error) => {
            console.error(error);
            reject(LocationNotFoundToast());
          }
        );
      } catch (error) {
        console.error(error);
        reject(LocationNotFoundToast());
      }
    });
  }

  return { position, getPosition };
}
