import HeroContent from './HeroContent';
import Carousel from './Carousel';
import HeroImg from "../../assets/hero.png";

const Hero = () => {
  const slides = [
    {
      season: "SUMMER 2025",
      title: "NEW COLLECTION",
      description: "We know how large objects will act, but things on a small scale.",
      image: HeroImg
    },
    {
      season: "AUTUMN 2025",
      title: "TRENDING NOW",
      description: "Discover our latest collection for the upcoming season.",
      image: HeroImg
    },
    {
      season: "WINTER 2025",
      title: "SPECIAL EDITION",
      description: "Limited edition items for the winter season.",
      image: HeroImg
    }
  ];

  return (
    <div className="w-[90%] m-auto hero-content flex justify-center items-center">
      <Carousel
        slides={slides.map(slide => (
          <HeroContent {...slide} />
        ))}
      />
    </div>
  );
};

export default Hero;