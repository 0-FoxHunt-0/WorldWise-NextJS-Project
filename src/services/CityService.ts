import CityModel from "@/models/CityModel";
import axios from "axios";

class CityService {
  public async getCities(): Promise<CityModel[]> {
    const { data } = await axios.get(
      `https://api.jsonbin.io/v3/b/${process.env.BIN_ID}/latest`,
      {
        headers: {
          "X-Master-Key": process.env.API_KEY,
        },
      }
    );
    const cities: CityModel[] = data.record.cities;
    return cities;
  }

  public flagEmojiToPNG(flag: string): string {
    const countryCode = Array.from(flag)
      .map((char) =>
        String.fromCodePoint(char.codePointAt(0)! - 127397).toLowerCase()
      )
      .join("");

    return `https://flagcdn.com/24x18/${countryCode}.png`;
  }
}

const cityService = new CityService();

export default cityService;
