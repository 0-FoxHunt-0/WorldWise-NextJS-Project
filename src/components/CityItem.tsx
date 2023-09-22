import CityModel from "@/models/CityModel";
import styles from "../styles/CityItem.module.css";
import Link from "next/link";
import { DateNotFound } from "@/lib/exceptions";

interface CityItemProps {
  city: CityModel;
}

function CityItem({ city }: CityItemProps) {
  const { cityName, emoji, date, position } = city;

  const flagEmojiToPNG = (flag: string): JSX.Element => {
    const countryCode = Array.from(flag)
      .map((char) =>
        String.fromCodePoint(char.codePointAt(0)! - 127397).toLowerCase()
      )
      .join("");

    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const formatDate = (date: string) => {
    if (date) {
      return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date));
    } else {
      throw new DateNotFound();
    }
  };

  return (
    <li>
      <Link
        href={`/app/cities/${cityName}?lan=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
