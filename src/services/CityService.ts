// "use server";

import appConfig from "@/lib/appConfig";
import CityModel from "@/models/CityModel";
import CountryModel from "@/models/CountryModel";
import axios from "axios";

async function getCitiesFromApi(session: any): Promise<CityModel[]> {
  const { data } = await axios.get(
    `${appConfig.baseUrl}/api/cities/${session.user.id}`
  );
  const cities: CityModel[] = data.cities;
  return cities;
}

async function addCityToApi(city: CityModel, session: any): Promise<CityModel> {
  const { data } = await axios.post(
    `${appConfig.baseUrl}/api/cities/${session?.user.id}`,
    city
  );

  const newCity: CityModel = data.newCity;
  return newCity;
}

async function deleteCityFromApi(cityId: string, session: any): Promise<void> {
  await axios.delete(`${appConfig.baseUrl}/api/cities/${cityId}`);
}

async function getCountriesFromApi(
  userId: string,
  session: any
): Promise<CountryModel[]> {
  const { data } = await axios.get(
    `${appConfig.baseUrl}/api/countries/${userId}`
  );

  return data.countries;
}

function flagEmojiToPNG(flag: string): string {
  const countryCode = Array.from(flag)
    .map((char) =>
      String.fromCodePoint(char.codePointAt(0)! - 127397).toLowerCase()
    )
    .join("");

  return `https://flagcdn.com/24x18/${countryCode}.png`;
}

const cityService = {
  getCitiesFromApi,
  getCountriesFromApi,
  addCityToApi,
  deleteCityFromApi,
  flagEmojiToPNG,
};

export default cityService;

// const cityService = new CityService();

// export default cityService;
