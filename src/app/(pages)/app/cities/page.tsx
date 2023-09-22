import CityList from "@/components/CityList";
import CityModel from "@/models/CityModel";
import cityService from "@/services/CityService";
import axios from "axios";
import React from "react";

async function CitiesPage() {
  const cities: CityModel[] = await cityService.getCities();

  return <CityList cities={cities}></CityList>;
}

export default CitiesPage;
