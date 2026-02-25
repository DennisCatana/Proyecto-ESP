import { useState, useEffect } from 'react';

const Carousel = () => {
const images = [
    'images/image1.jpeg',
    'images/image2.jpeg',
    'images/image3.jpeg',
    'images/image4.jpg',
    'images/image5.jpeg',
    'images/image6.jpeg',
    'images/image7.jpeg',
    'images/image8.jpeg',
    'images/image9.jpeg',
    'images/image10.jpeg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto text-center">
      <div className="relative">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery ${currentIndex + 1}`}
          className="w-[80%] h-[400px] mx-auto object-cover rounded-xl border-2 border-gray-200 shadow-lg"
          style={{
            filter: 'brightness(1.05) saturate(1.1)',
          }}
        />
        
        {/* Left Arrow */}
        <button 
          onClick={prevImage}
          className="absolute top-1/2 left-10 -translate-y-1/2 bg-black/50 text-white border-none p-3 cursor-pointer text-xl rounded-full hover:bg-black/80 transition-colors"
        >
          ←
        </button>
        
        {/* Right Arrow */}
        <button 
          onClick={nextImage}
          className="absolute top-1/2 right-10 -translate-y-1/2 bg-black/50 text-white border-none p-3 cursor-pointer text-xl rounded-full hover:bg-black/80 transition-colors"
        >
          →
        </button>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-[#007BFF] w-6' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
