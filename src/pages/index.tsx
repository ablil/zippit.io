import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Zippit from "@/components/Zippit";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <header className="md:text-center md:pt-32">
        <h1 className="text-4xl md:text-6xl capitalize my-4 w-3/4 md:w-full font-bold">
          You can zip files & you can zip links too!
        </h1>
        <p className="text-xl font-light capitalize">quick, simple & effective.</p>
      </header>
      <Zippit />
    </>
  );
}
