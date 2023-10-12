import axios from "axios";

import CountryList from "@/components/CountryList";
import CityModel from "@/models/CityModel";
import CountryModel from "@/models/CountryModel";
import cityService from "@/services/CityService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function CountryPage() {
  // const { data } = await axios.get(
  //   `https://api.jsonbin.io/v3/b/${process.env.BIN_ID}/latest`,
  //   {
  //     headers: {
  //       "X-Master-Key": process.env.API_KEY,
  //     },
  //   }
  // );
  // const cities: CityModel[] = data.record;
  // const countries: CountryModel[] = [];
  // cities.forEach((city) => {
  //   if (countries.length === 0)
  //     countries.push({ country: city.country, emoji: city.emoji });
  //   else {
  //     const existingCountry = countries.find(
  //       (country) => country.country === city.country
  //     );
  //     if (!existingCountry)
  //       countries.push({ country: city.country, emoji: city.emoji });
  //     else return;
  //   }
  // });

  const session = await getServerSession(authOptions);
  const countries: CountryModel[] = await cityService.getCountriesFromApi(session?.user.id, session);

  return <CountryList countries={countries} />;
}

export default CountryPage;
