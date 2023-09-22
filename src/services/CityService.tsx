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
}

const cityService = new CityService();

export default cityService;
