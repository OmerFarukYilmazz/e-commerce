import Hero from "../components/home/Hero";
import Content from "../components/home/Content";
import Features from "../components/home/Features";
import Clients from "../components/home/Clients";
import Blog from "../components/home/Blog"; 
import ShopCard from "../components/home/ShopCard";
import ProductCards from "../components/home/ProductCards";




const HomePage = () => {
  return (
    <div>
      <Hero />
      <Clients />
      <ShopCard />
      <ProductCards/>  
      <Content />
      <Features />
      <Blog />
    </div>
  );
};

export default HomePage;

