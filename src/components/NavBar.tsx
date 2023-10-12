import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import styles from "../styles/PageNav.module.css";
import Logo from "./Logo";
import NavLink from "./NavLink";
import LoginButton from "./LoginButton";

async function NavBar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

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
          {!user ? (
            <NavLink href={"/sign-in"} className={styles.ctaLink}>
              Login
            </NavLink>
          ) : (
            <NavLink href="/" className={styles.ctaLink}>
              <LoginButton />
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
