import Link from "next/link";
import styles from "../styles/Logo.module.css";

function Logo() {
  return (
    <Link href={"/"}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
