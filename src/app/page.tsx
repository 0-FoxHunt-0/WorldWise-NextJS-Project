import NavBar from "@/components/NavBar";
import Link from "next/link";
import styles from "../styles/Homepage.module.css";

async function Home() {
  return (
    <main className={styles.homepage}>
      <NavBar />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link href={"/app/cities"} className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}

export default Home;
