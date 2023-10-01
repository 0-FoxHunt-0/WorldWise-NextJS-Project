"use client";

import CityModel from "@/models/CityModel";
import styles from "../styles/CityItem.module.css";
import Link from "next/link";
import { DateNotFoundToast } from "@/lib/exceptions";
import cityService from "@/services/CityService";
import { useCitiesContext } from "@/contexts/CitiesContext";

interface CityItemProps {
  city: CityModel;
}

function CityItem({ city }: CityItemProps) {
  const { cityName, emoji, date, position, id } = city;
  const { selectedCity, setSelectedCity } = useCitiesContext();

  const formatDate = (date: string) => {
    if (date) {
      return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date));
    } else {
      DateNotFoundToast();
    }
  };

  return (
    <li>
      <Link
        href={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          selectedCity?.id === id ? styles["cityItem--active"] : ""
        }`}
        onClick={() => setSelectedCity(city)}
      >
        <span className={styles.emoji}>
          <img src={cityService.flagEmojiToPNG(emoji)} alt="flag" />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>
          <span>&times;</span>
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
