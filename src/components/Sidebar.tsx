import { ReactNode } from "react";
import styles from "../styles/Sidebar.module.css";
import AppNavigation from "./AppNavigation";
import Footer from "./Footer";
import Logo from "./Logo";

interface SidebarProps {
  children: ReactNode;
}

function Sidebar({ children }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />
      {children}
      <Footer />
    </div>
  );
}

export default Sidebar;
