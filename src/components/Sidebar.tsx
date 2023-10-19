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
    <div className={`${styles.sidebar} max-xl:!basis-2/5 max-lg:!h-1/2 max-lg:!pb-4 max-lg:!pt-8 max-sm:!px-2`}>
      <Logo />
      <AppNavigation />
      {children}
      <Footer />
    </div>
  );
}

export default Sidebar;
