import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"}>
      <img src="/logo.png" alt="WorldWise logo" className="h-16 block xl:h-24" />
    </Link>
  );
}

export default Logo;
