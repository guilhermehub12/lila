import About from "./components/About";
import Hero from "./components/Hero";
import CakeOrder from "./components/CakeOrder";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <WhyUs />
      <Services />
      <Products />
      <Testimonials />
      <FAQ />
      <CakeOrder />
      <Footer />
    </main>
  )
}