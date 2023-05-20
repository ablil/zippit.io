import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="py-4 flex items-center">
      <Link href="/" className="text-2xl font-bold tracking-wide">
        <span className="text-primary capitalize">zippit</span>.io
      </Link>
      <Link href="/tracking" className="ml-auto hover:underline">tracking</Link>
    </nav>
  );
};

export default Navbar;
