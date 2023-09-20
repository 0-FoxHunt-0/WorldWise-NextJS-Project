"use client";

import CountryModel from "@/models/CountryModel";
import { useState } from "react";
import styles from "../styles/CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

interface CountryListProps {
  countries: CountryModel[];
}

function CountryList(props: CountryListProps) {
  const [countries, setCountries] = useState<CountryModel[]>(props.countries);

  if (!countries.length)
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
