import axios from "axios";

import CountryList from "@/components/CountryList";
import CityModel from "@/models/CityModel";
import CountryModel from "@/models/CountryModel";

async function CountryPage() {
  const { data } = await axios.get(
    `https://api.jsonbin.io/v3/b/${process.env.BIN_ID}/latest`,
    {
      headers: {
        "X-Master-Key": process.env.API_KEY,
      },
    }
  );
  const cities: CityModel[] = data.record.cities;
  const countries: CountryModel[] = [];
  cities.forEach((city) => {
    if (countries.length === 0)
      countries.push({ country: city.country, emoji: city.emoji });
    else {
      const existingCountry = countries.find(
        (country) => country.country === city.country
      );
      if (!existingCountry)
        countries.push({ country: city.country, emoji: city.emoji });
      else return;
    }
  });

  return <CountryList countries={countries} />;
}

export default CountryPage;
