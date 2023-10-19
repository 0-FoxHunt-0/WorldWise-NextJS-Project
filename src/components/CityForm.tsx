"use client";

import { useUrlPosition } from "@/hooks/useUrlPosition";
import { ResourceNotFoundToast } from "@/lib/exceptions";
import { cn } from "@/lib/utils";
import cityService from "@/services/CityService";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Spinner from "./Spinner";
import { Button as ButtonUI } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import CityModel from "@/models/CityModel";
import { useCitiesContext } from "@/contexts/CitiesContext";
const { v4: uuidv4 } = require("uuid");

export function convertToEmoji(countryCode: string): string {
  const base = 127397; // Offset code point for regional indicator symbol letters A
  const codePoints = Array.from(countryCode.toUpperCase()).map(
    (char) => base + char.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}

function CityForm() {
  const router = useRouter();
  const { lat, lng } = useUrlPosition();
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const { createCity } = useCitiesContext();

  const backCallBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("cities");
  };

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity: CityModel = {
      cityName,
      country,
      emoji,
      date: date.toString(),
      notes,
      position: { lat, lng },
    };
    createCity(newCity);
  }

  useEffect(() => {
    if (!lat && !lng) return;

    async function getCityData() {
      try {
        setIsLoadingGeocoding(true);
        const { data } = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        if (data.countryCode === "" || data.countryCode === null) {
          ResourceNotFoundToast(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
          setCityName("");
          setEmoji("");
          setNotes("");
          return;
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return ResourceNotFoundToast("Start by clicking on the map.");

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          className="focus:bg-light-2"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {emoji.length > 0 && (
          <img
            className={styles.flag}
            src={cityService.flagEmojiToPNG(emoji)}
            alt="countryFlag"
          />
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <div className="flex justify-center w-full">
          <Popover>
            <PopoverTrigger asChild>
              <ButtonUI
                variant={"outline"}
                className={cn(
                  "w-full text-black pl-3 text-left font-normal text-xl py-7 border-4 border-light-3 bg-light-3 hover:border-light-2 hover:bg-light-2",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
              </ButtonUI>
            </PopoverTrigger>
            <PopoverContent className="p-0 text-black" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          className="outline-none focus:bg-light-2"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type="primary"
          onClickHandler={() => {
            router.push("cities");
          }}
        >
          Add
        </Button>
        <ButtonBack onClickHandler={backCallBack} />
      </div>
    </form>
  );
}

export default CityForm;
