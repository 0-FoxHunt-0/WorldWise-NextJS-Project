"use client";

import { useCitiesContext } from "@/contexts/CitiesContext";
import styles from "../styles/CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading } = useCitiesContext();

  if (!cities?.length && !isLoading)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
