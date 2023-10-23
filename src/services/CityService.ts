import CityModel from "@/models/CityModel";
import CountryModel from "@/models/CountryModel";
import axios from "axios";

async function getCitiesFromApi(
  session: any,
  hostUrl: string
): Promise<CityModel[]> {
  const { data } = await axios.get(`${hostUrl}/api/cities/${session.user.id}`);
  const cities: CityModel[] = data.cities;
  return cities;
}

async function addCityToApi(
  city: CityModel,
  session: any,
  hostUrl: string
): Promise<CityModel> {
  const { data } = await axios.post(
    `${hostUrl}/api/cities/${session?.user.id}`,
    city
  );

  const newCity: CityModel = data.newCity;
  return newCity;
}

async function deleteCityFromApi(
  cityId: string,
  hostUrl: string
): Promise<void> {
  await axios.delete(`${hostUrl}/api/cities/${cityId}`, {
    headers: { "Content-Type": "application/json" },
  });
}

async function getCountriesFromApi(
  userId: string,
  session: any,
  hostUrl: string
): Promise<CountryModel[]> {
  const { data } = await axios.get(`${hostUrl}/api/countries/${userId}`);

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
