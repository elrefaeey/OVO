import React from 'react';

const images = [
  'https://i.pinimg.com/736x/4b/88/f4/4b88f47c2f019c91cd34437e627efab0.jpg', // يمين
  'https://videos.openai.com/vg-assets/assets%2Ftask_01jypc2cm4f0v9ey5xg7fgppwb%2F1750950130_img_0.webp?st=2025-06-26T13%3A21%3A30Z&se=2025-07-02T14%3A21%3A30Z&sks=b&skt=2025-06-26T13%3A21%3A30Z&ske=2025-07-02T14%3A21%3A30Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=yqJRZg5L8fgFaw2XRnoXE8fLvSJvFalnaS0o%2Fy098vw%3D&az=oaivgprodscus', // وسط
  'https://i.pinimg.com/736x/bb/56/b9/bb56b915b64ba4096ae20f9951042c45.jpg', // شمال
];

const ImageGridHero = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center bg-black overflow-hidden">
      {/* الصور */}
      <div className="absolute inset-0 flex w-full h-full">
        {/* يمين */}
        <img
          src={images[0]}
          alt="right"
          className="hidden md:block w-1/3 h-full object-cover object-center"
        />
        {/* وسط */}
        <img
          src={images[1]}
          alt="center"
          className="w-full md:w-1/3 h-full object-cover object-center mx-auto"
        />
        {/* شمال */}
        <img
          src={images[2]}
          alt="left"
          className="hidden md:block w-1/3 h-full object-cover object-center"
        />
      </div>
      {/* الأزرار */}
      <div className="relative z-10 flex flex-col items-center w-full px-2">
        <div className="text-center text-white mb-4 md:mb-6">
          <h1 className="text-4xl xs:text-5xl md:text-8xl font-bold mb-4 md:mb-6 tracking-wider drop-shadow-lg">
            OVO
          </h1>
          <p className="text-lg xs:text-xl md:text-2xl mb-6 md:mb-8 opacity-90 drop-shadow-lg">
            Elegance Redefined
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/products'}
          className="flex items-center border-2 border-black px-6 py-3 font-bold text-black bg-white hover:bg-stone-100 transition-colors text-base md:text-lg tracking-wide group mx-auto mb-3 rounded-md w-full max-w-xs md:max-w-fit justify-center"
        >
          Shop Now
          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </button>
        <div className="flex flex-row flex-wrap justify-center gap-3 md:gap-4 mt-2 w-full max-w-2xl">
          <a
            href="/products?category=Women"
            className="flex items-center border-2 border-black px-6 py-3 font-bold text-black bg-white hover:bg-stone-100 transition-colors text-base md:text-lg tracking-wide group rounded-md min-w-[140px] justify-center"
          >
            SHOP WOMEN
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/products?category=Men"
            className="flex items-center border-2 border-black px-6 py-3 font-bold text-black bg-white hover:bg-stone-100 transition-colors text-base md:text-lg tracking-wide group rounded-md min-w-[140px] justify-center"
          >
            SHOP MEN
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/products?category=Kids"
            className="flex items-center border-2 border-black px-6 py-3 font-bold text-black bg-white hover:bg-stone-100 transition-colors text-base md:text-lg tracking-wide group rounded-md min-w-[140px] justify-center"
          >
            SHOP KIDS
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
      {/* تغطية شفافة خفيفة */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default ImageGridHero;
