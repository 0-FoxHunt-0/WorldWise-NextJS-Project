"use client"

import City from "@/components/City";
import { useRouter } from "next/navigation";

function CityPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lan: string; lng: string };
}) {
  const router = useRouter();

  return (
    <City params={params} searchParams={searchParams} backCallback={() => router.back()}></City>
  );
}

export default CityPage;
