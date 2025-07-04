import Features from "@/components/features";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <Hero />
      <Features/>
    </div>
  );
}
