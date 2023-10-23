"use client";

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
  session: any;
  hostUrl: string;
}

interface ContextProps {
  cities: CityModel[];
  setCities: Dispatch<SetStateAction<CityModel[]>>;
  selectedCity: CityModel | undefined;
  setSelectedCity: Dispatch<SetStateAction<CityModel | undefined>>;
  createCity: (city: CityModel) => void;
  deleteCity: (id: string) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const CitiesContext = createContext<ContextProps>({
  cities: [],
  setCities: (): CityModel[] => [],
  selectedCity: undefined,
  setSelectedCity: (): CityModel | undefined => undefined,
  createCity: (): CityModel | undefined => undefined,
  deleteCity: (): CityModel | undefined => undefined,
  isLoading: false,
  setIsLoading: (): boolean => false,
});

export function CitiesProvider({
  children,
  session,
  hostUrl,
}: CitiesProviderProps): JSX.Element {
  const [cities, setCities] = useState<CityModel[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityModel>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);
        const data: CityModel[] = await cityService.getCitiesFromApi(
          session,
          hostUrl
        );
        setCities(data);
      } catch (error) {
        console.error(error);
        ResourceNotFoundToast();
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, [hostUrl, session]);

  async function createCity(city: CityModel) {
    try {
      setIsLoading(true);
      const newCity: CityModel = await cityService.addCityToApi(
        city,
        session,
        hostUrl
      );
      const prevState = cities;
      prevState.push(newCity);
      setCities(prevState);
    } catch (error) {
      console.error(error);
      ResourceNotFoundToast();
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(cityId: string) {
    try {
      setIsLoading(true);
      await cityService.deleteCityFromApi(cityId, hostUrl);
      const newCitiesState = cities.filter((c) => c.id !== cityId);
      setCities(newCitiesState);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        selectedCity,
        setSelectedCity,
        createCity,
        deleteCity,
        isLoading,
        setIsLoading,
      }}
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
