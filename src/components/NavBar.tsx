import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import styles from "../styles/PageNav.module.css";
import Logo from "./Logo";
import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";
import CollapsibleMenu from "./CollapsibleMenu";

async function NavBar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav
      className={`${styles.nav} flex flex-row items-center justify-between xl:text-`}
    >
      <Logo />
      <div id="collapseMenu" className="md:hidden">
        <CollapsibleMenu user={user} />
      </div>
      <ul className="sl:hidden md:flex md:justify-center md:gap-16 md:items-center">
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
              <LogoutButton />
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
