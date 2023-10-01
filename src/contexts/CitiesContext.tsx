"use client";

import Loading from "@/app/(pages)/app/loading";
import { OutOfContextToast, ResourceNotFoundToast } from "@/lib/exceptions";
import CityModel from "@/models/CityModel";
import cityService from "@/services/CityService";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CitiesProviderProps {
  children: ReactNode;
}

interface ContextProps {
  cities: CityModel[];
  setCities: Dispatch<SetStateAction<CityModel[]>>;
  selectedCity: CityModel | undefined;
  setSelectedCity: Dispatch<SetStateAction<CityModel | undefined>>;
  createCity: (city: CityModel) => void;
}

const CitiesContext = createContext<ContextProps>({
  cities: [],
  setCities: (): CityModel[] => [],
  selectedCity: undefined,
  setSelectedCity: (): CityModel | undefined => undefined,
  createCity: (): CityModel | undefined => undefined,
});

export function CitiesProvider({ children }: CitiesProviderProps): JSX.Element {
  const [cities, setCities] = useState<CityModel[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityModel>();

  useEffect(() => {
    async function getCities() {
      try {
        const data: CityModel[] = await cityService.getCities();
        setCities(data);
      } catch (error) {
        console.error(error);
        ResourceNotFoundToast();
      }
    }
    getCities();
  }, []);

  async function createCity(city: CityModel) {
    try {
      const data = cities;
      data.push(city);
      await cityService.updateCities(data);
    } catch (error) {
      console.error(error);
      ResourceNotFoundToast();
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, setCities, selectedCity, setSelectedCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export const useCitiesContext = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    OutOfContextToast("CitiesContext was used outside of the provider");
  return context;
};
