import React from "react";
import styles from "../styles/SpinnerFullPage.module.css";
import Spinner from "./Spinner";

function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullPage}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
