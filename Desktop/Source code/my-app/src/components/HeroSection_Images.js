import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mảng chứa thông tin các slides
  const slides = [
    {
      url: "/images/Carousel_2.jpg",
      title: "Ưu đãi hấp dẫn",
      description: "Nhiều chương trình khuyến mãi đặc biệt mỗi ngày"
    },
    {
        url: "/images/Carousel_3.jpg",
        title: "Quản lý kho thiết bị điện tử ",
        description: "Nhiều chương trình khuyến mãi đặc biệt mỗi ngày"
      },
    {
        url: "/images/qlkho_2.jpg",
        title: "Đã có hơn 5 năm kinh nghiệm",
        description: "Trong quản lý kho thiết bị điện tử "
      },
      {
        url: "/images/qlkho_3.jpg",
        title: "Trải nghiệm khách hàng ",
        description: "là sự ưu tiên hàng đầu của chúng tôi"
      },
      {
        url: "/images/Carousel_1.jpg",
        title: "Trở thành đại lý",
        description: "Của chúng tôi ngay hôm nay để không bị bỏ lỡ thêm lần nào nữa"
      },
    
  ];

  // Auto chuyển slide sau mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Xử lý chuyển slide thủ công
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Xử lý chuyển slide bằng dots
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Slides */}
      <div 
        className="h-full w-full relative"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 h-full w-full"
            style={{ left: `${index * 100}%` }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-center max-w-2xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex === index 
                ? "w-8 bg-white" 
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;