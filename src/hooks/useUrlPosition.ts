import { useSearchParams } from "next/navigation";

export function useUrlPosition() {
  const searchParams = useSearchParams();
  const lat = +searchParams.get("lat");
  const lng = +searchParams.get("lng");

  return { lat, lng };
}
