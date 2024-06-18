import { useEffect, useState } from "react";
import "animate.css";

export const Carousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliders = [
    {
      img: "https://i.ibb.co/mT5nK6z/r2.jpg",
      title: "why Choose us?",
      des: "trusted!",
    },
    {
      img: "https://i.ibb.co/cCxRrvY/r1.jpg",
      title: "best service ever!",
      des: "We have more than one thousand 5-star reviews",
    },
    {
      img: "https://i.ibb.co/9Vj8kLQ/r3.jpg",
      title: "7 days money back guarantee",
      des: "If you think we are not perfect, we can get your money back without asking any questions",
    },
    {
      img: "https://i.ibb.co/q7gSrmz/r4.jpg",
      title: "Special Offers",
      des: "Check out our latest promotions!",
    },
    {
      img: "https://i.ibb.co/kQ9MRhH/r5.jpg",
      title: "Discover Our Products",
      des: "Explore our wide range of offerings",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider , sliders.length]);

  return (
    <>
      <div
        className="w-full h-60 sm:h-96 md:h-[540px] flex flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-center before:absolute before:bg-black/50 before:inset-0 transform duration-1000 ease-linear "
        style={{ backgroundImage: `url(${sliders[currentSlider].img})` }}
      >
        <div className="drop-shadow-lg text-white text-center px-5">
          <h1 className="text-xl lg:text-3xl font-semibold mb-3 animate__animated animate__bounce">
            {sliders[currentSlider].title}
          </h1>
          <p className="text-sm md:text-base lg:text-lg animate__animated  animate__tada">
            {sliders[currentSlider].des}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 p-2">
        {sliders.map((slide, inx) => (
          <img
            onClick={() => setCurrentSlider(inx)}
            key={inx}
            src={slide.img}
            className={`w-10 md:w-20 h-6 sm:h-8 md:h-12 bg-black/20 ${
              currentSlider === inx ? "border-2 border-black p-px" : ""
            } rounded-md md:rounded-lg box-content cursor-pointer`}
            alt={slide.title}
          />
        ))}
      </div>
    </>
  );
};
