import CityModel from "@/models/CityModel";
import styles from "../styles/CityItem.module.css";

interface CityItemProps {
  city: CityModel;
}

function CityItem({ city }: CityItemProps) {
  const { cityName, emoji, date } = city;

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
      return "Sorry, No date found.";
    }
  };

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
