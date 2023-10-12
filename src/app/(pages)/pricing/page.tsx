import NavBar from "@/components/NavBar";
import styles from "../../../styles/Product.module.css";

function Pricing() {
  return (
    <main className={styles.product}>
      <NavBar />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img
          src="img-2.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
      </section>
    </main>
  );
}

export default Pricing;
