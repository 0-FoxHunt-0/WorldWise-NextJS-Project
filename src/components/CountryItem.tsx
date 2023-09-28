import React from "react";
import styles from "../styles/CountryItem.module.css";
import CountryModel from "@/models/CountryModel";
import cityService from "@/services/CityService";

interface CountryItemProps {
  country: CountryModel;
}

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>
        {" "}
        <img src={cityService.flagEmojiToPNG(country.emoji)} alt="flag" />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
