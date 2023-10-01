"use client";

import styles from "../styles/PageNav.module.css";
import Logo from "./Logo";
import NavLink from "./NavLink";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink href={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink href={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink href={"/login"} className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
