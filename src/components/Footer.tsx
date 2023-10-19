import React from "react";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={`${styles.footer} max-lg:!mt-4`}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by WorldWide Inc.
      </p>
    </footer>
  );
}

export default Footer;
