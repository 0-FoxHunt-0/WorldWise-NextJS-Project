"use client";

import CityForm from "@/components/CityForm";
import { useRouter } from "next/navigation";

function Form() {
  const router = useRouter();

  const handleBackButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push("cities");
  };

  return <CityForm backCallback={() => handleBackButton} />;
}

export default Form;
