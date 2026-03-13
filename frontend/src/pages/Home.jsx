// 🟦 [TEMPLATE: BANNER_AND_GRID_LAYOUT]
// You can use this file as a template for any site that needs a banner slider on the left and a widget on the right.

import { useState, useEffect } from 'react';

// These point to the frontend/public/images/ folder you just created
const bannerImages =[
  "/images/banner1.jpg", 
  "/images/banner2.jpg", 
  "/images/banner3.jpg"
];

export default function Home() {
  const[currentSlide, setCurrentSlide] = useState(0);

  // Template feature: Auto-slider logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    }, 3000); 
    return () => clearInterval(slideInterval);
  },[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Section: Banner Slider */}
        <div className="md:col-span-2 rounded-lg overflow-hidden shadow-lg relative h-[400px] bg-gray-200 flex items-center justify-center">
          {bannerImages.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`School Banner ${index + 1}`} 
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              // If image is missing, it shows a text fallback (great for testing)
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          ))}
          {/* Missing Image Fallback Text */}
          <span className="text-gray-500 z-[-1]">Put banner images in public/images/</span>

          {/* Slider Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {bannerImages.map((_, index) => (
              <div 
                key={index} 
                className={`h-3 w-3 rounded-full ${index === currentSlide ? "bg-primary" : "bg-white"}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Section: Headmaster Speech */}
        <div className="bg-secondary p-6 rounded-lg shadow-lg border-t-4 border-primary flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-primary mb-4 border-b-2 border-gray-200 w-full pb-2">প্রধান শিক্ষকের বাণী</h2>
          
          <div className="w-32 h-32 rounded-full border-4 border-primary mb-4 shadow-md overflow-hidden bg-gray-200 flex items-center justify-center">
            <img 
              src="/images/headmaster.jpg" 
              alt="Headmaster" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          
          <h3 className="font-bold text-lg text-gray-800">মোঃ আব্দুর রহমান</h3>
          <p className="text-sm text-gray-500 mb-4">প্রধান শিক্ষক, কোদন্ডা উচ্চ বিদ্যালয়</p>
          
          <p className="text-gray-700 text-sm italic leading-relaxed">
            "শিক্ষাই জাতির মেরুদণ্ড। কোদন্ডা উচ্চ বিদ্যালয় দীর্ঘ বছর ধরে সুনামের সাথে শিক্ষা বিস্তার করে আসছে। আমাদের লক্ষ্য শুধু পাঠ্যবইয়ের শিক্ষা নয়, বরং শিক্ষার্থীদের নৈতিক ও মানবিক মূল্যবোধে জাগ্রত করা। ডিজিটাল বাংলাদেশ গড়ার লক্ষ্যে আমাদের এই নতুন ওয়েবসাইটটি ছাত্র-ছাত্রী ও অভিভাবকদের জন্য এক নতুন দিগন্ত উন্মোচন করবে।"
          </p>
        </div>

      </div>
    </div>
  );
}