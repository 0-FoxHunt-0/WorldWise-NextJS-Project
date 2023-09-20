import React from "react";
import styles from "../styles/CountryItem.module.css";
import CountryModel from "@/models/CountryModel";

interface CountryItemProps {
  country: CountryModel;
}

function CountryItem({ country }: CountryItemProps) {
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

  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
