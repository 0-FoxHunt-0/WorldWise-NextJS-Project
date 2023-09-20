import CityList from "@/components/CityList";
import CityModel from "@/models/CityModel";
import axios from "axios";
import React from "react";

async function CitiesPage() {
  const { data } = await axios.get(
    `https://api.jsonbin.io/v3/b/${process.env.BIN_ID}/latest`,
    {
      headers: {
        "X-Master-Key": process.env.API_KEY,
      },
    }
  );
  const cities: CityModel[] = data.record.cities;

  return <CityList cities={cities}></CityList>;
}

export default CitiesPage;
