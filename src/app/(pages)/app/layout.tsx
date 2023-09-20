import React, { ReactNode } from "react";
import styles from "../../../styles/AppLayout.module.css";
import Sidebar from "@/components/Sidebar";
import Map from "@/components/Map";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.app}>
      <Sidebar>{children}</Sidebar>
      <Map />
    </div>
  );
}

export default AppLayout;
