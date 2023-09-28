"use client";

import { useCitiesContext } from "@/contexts/CitiesContext";
import styles from "../styles/CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList() {
  const { cities } = useCitiesContext();

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
