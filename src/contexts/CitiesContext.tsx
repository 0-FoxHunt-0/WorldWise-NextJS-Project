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
}

const CitiesContext = createContext<ContextProps>({
  cities: [],
  setCities: (): CityModel[] => [],
  selectedCity: undefined,
  setSelectedCity: (): CityModel | undefined => undefined,
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

  return (
    <CitiesContext.Provider
      value={{ cities, setCities, selectedCity, setSelectedCity }}
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
