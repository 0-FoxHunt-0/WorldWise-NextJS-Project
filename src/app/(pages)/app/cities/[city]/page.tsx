import City from "@/components/City";
import CityModel from "@/models/CityModel";
import cityService from "@/services/CityService";
import React from "react";

async function CityPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lan: string; lng: string };
}) {
  const cities: CityModel[] = await cityService.getCities();
  console.log(params, searchParams);

  return (
    <City cities={cities} params={params} searchParams={searchParams}></City>
  );
}

export default CityPage;
