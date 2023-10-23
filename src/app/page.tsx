import NavBar from "@/components/NavBar";
import Link from "next/link";
import styles from "../styles/Homepage.module.css";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className={`${styles.homepage} sl:!overflow-auto max-sm:!px-12`}>
      <NavBar />
      <section>
        <h1 className="xl:!text-7xl lg:!text-5xl md:text-!5xl sm:!text-4xl sl:!text-3xl">
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2 className="xl:text-4xl lg:text-2xl md:text-xl sm:text-xl sl:text-xl">
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        {session !== null ? (
          <Link
            href={"/app/cities"}
            className="cta xl:!text-3xl xl:!px-12 xl:!py-6 sl:!text-xl sl:!px-7 sl:!py-4"
          >
            Start tracking now
          </Link>
        ) : (
          <Link
            href={"/sign-in"}
            className="cta xl:!text-3xl xl:!px-12 xl:!py-6 sl:!text-xl sl:!px-7 sl:!py-4"
          >
            Get started
          </Link>
        )}
      </section>
    </main>
  );
}

export default Home;
