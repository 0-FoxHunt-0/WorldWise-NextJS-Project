import styles from "../styles/AppNav.module.css";
import NavLink from "./NavLink";

function AppNavigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink href={"/app/cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink href={"/app/countries"}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNavigation;
