class CityModel {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  userId: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default CityModel;
