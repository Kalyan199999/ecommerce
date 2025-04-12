export const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-blue-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };
  
export const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-blue-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    );
  };
  
  export   const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };