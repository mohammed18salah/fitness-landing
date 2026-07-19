import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Categories from "./components/Categories";
import Library from "./components/Library";
import Plan from "./components/Plan";
import Nutrition from "./components/Nutrition";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main>
        <Hero />
        <Generator />
        <Categories />
        <Library />
        <Plan />
        <Stats />
        <Nutrition />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}