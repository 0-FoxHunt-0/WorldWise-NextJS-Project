import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { CitiesProvider } from "@/contexts/CitiesContext";
import { ReactNode } from "react";
import styles from "../../../styles/AppLayout.module.css";
import { Toaster } from "@/components/ui/toaster";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.app}>
      <CitiesProvider>
        <Sidebar>{children}</Sidebar>
        <Map />
      </CitiesProvider>
      <Toaster />
    </div>
  );
}

export default AppLayout;
