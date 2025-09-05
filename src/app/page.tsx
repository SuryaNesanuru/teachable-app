import { Hero } from "@/components/landing/hero";
import { Categories } from "@/components/landing/categories";
import { Testimonials } from "@/components/landing/testimonials";
import { Featured } from "@/components/landing/featured";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Featured />
      <Testimonials />
    </div>
  );
}
