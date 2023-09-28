"use client";

import { useState } from "react";
import styles from "../styles/Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char, i) => 127397 + char.charCodeAt(i));
  return String.fromCodePoint(...codePoints);
}

interface CityFormProps {
  backCallback: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function CityForm({ backCallback }: CityFormProps) {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());
  const [notes, setNotes] = useState<string>("");

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClickHandler={() => {}}>
          Add
        </Button>
        <ButtonBack onClickHandler={backCallback} />
      </div>
    </form>
  );
}

export default CityForm;
