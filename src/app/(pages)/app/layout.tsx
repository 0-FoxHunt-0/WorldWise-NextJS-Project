"use client";

import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { CitiesProvider } from "@/contexts/CitiesContext";
import { useGeolocation } from "@/hooks/useGeolocation";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import styles from "../../../styles/AppLayout.module.css";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const cityId = usePathname();
  const searchParams = useSearchParams();


  return (
    <div className={styles.app}>
      <CitiesProvider>
        <Sidebar>{children}</Sidebar>
        <Map
          cityId={cityId}
          searchParams={searchParams}
        />
      </CitiesProvider>
    </div>
  );
}

export default AppLayout;
