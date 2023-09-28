"use client";

import { useCitiesContext } from "@/contexts/CitiesContext";
import { DateNotFoundToast, ResourceNotFoundToast } from "@/lib/exceptions";
import CityModel from "@/models/CityModel";
import cityService from "@/services/CityService";
import styles from "../styles/City.module.css";
import ButtonBack from "./ButtonBack";

const formatDate = (date: string) => {
  if (date) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  } else {
    DateNotFoundToast();
  }
};

interface CityProps {
  params: { id: string };
  searchParams: { lan: string; lng: string };
  backCallback: () => void;
}

function City({ params, searchParams, backCallback }: CityProps): JSX.Element {
  const { cities } = useCitiesContext();

  const currentCity: CityModel | undefined = cities.find(
    (city) => city.id === +params.id
  );

  if (currentCity) {
    const { cityName, emoji, date, notes } = currentCity;
    return (
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>
              <img src={cityService.flagEmojiToPNG(emoji)} alt="flag" />
            </span>{" "}
            {cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>

        <div>
          <ButtonBack onClickHandler={backCallback} />
        </div>
      </div>
    );
  } else {
    ResourceNotFoundToast("City not found.");
  }
}

export default City;
