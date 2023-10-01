"use client";

import { useState } from "react";
import { LocationNotFoundToast } from "@/lib/exceptions";
import PositionModel from "@/models/PositionModel";
import { useRouter } from "next/navigation";

export function useGeolocation() {
  const [position, setPosition] = useState<PositionModel>({lat: undefined, lng: undefined});
  const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(false);
  const router = useRouter();

  function handleTryAgain() {
    router.refresh();
  }

  function getPosition(): Promise<PositionModel> {
    if (!navigator.geolocation) {
      LocationNotFoundToast("Location not found", handleTryAgain);
      return null;
    }

    return new Promise<PositionModel>((resolve, reject) => {
      try {
        setIsLoadingPosition(true);
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
            reject(LocationNotFoundToast("Location not found", handleTryAgain));
          }
        );
      } catch (error) {
        console.error(error);
        reject(LocationNotFoundToast());
      } finally {
        setIsLoadingPosition(false);
      }
    });
  }

  return { position, getPosition, isLoadingPosition };
}
