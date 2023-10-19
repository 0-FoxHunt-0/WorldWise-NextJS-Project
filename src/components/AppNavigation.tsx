import styles from "../styles/AppNav.module.css";
import NavLink from "./NavLink";

function AppNavigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink className="xl:!text-2xl xl:!py-4 xl:px-8" href={"/app/cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink className="xl:!text-2xl xl:!py-4 xl:px-8" href={"/app/countries"}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNavigation;
