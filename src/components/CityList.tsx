"use client";

import React, { useState } from "react";
import styles from "../styles/CityList.module.css";
import CityModel from "@/models/CityModel";
import CityItem from "./CityItem";
import Message from "./Message";

interface CityListProps {
  cities: CityModel[];
}

function CityList(props: CityListProps) {
  const [cities, setCities] = useState<CityModel[]>(props.cities);

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
