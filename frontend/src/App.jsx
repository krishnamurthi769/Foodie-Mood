import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, ShoppingBag, Music } from 'lucide-react';
import ZomatoBottomSheet from './ZomatoBottomSheet';

// --- 1. THE DATA (Simulating a Database) ---
const REELS_DATA = [
  {
    id: 1,
    username: "burger_king_fan",
    avatar: "https://i.pravatar.cc/100?img=12",
    description: "Juiciest burger in town! 🍔 #foodie #cheatday",
    videoUrl: "/public/videos/reel_01.mp4", // Local video
    likes: "12.4K",
    isFood: true,
    product: {
      id: 101,
      restaurant_name: "Burger King",
      item_name: "Double Cheese Burger",
      price: 350,
      rating: 4.5,
      delivery_time_min: 30
    }
  },
  {
    id: 2,
    username: "travel_diaries",
    avatar: "https://i.pravatar.cc/100?img=20",
    description: "Peaceful vibes in Bali 🌊 #travel #nature",
    videoUrl: "/public/videos/reel_02.mp4", // Nature (NOT Food)
    likes: "8.2K",
    isFood: false, // This will be HIDDEN in Foodie Mode
    product: null
  },
  {
    id: 3,
    username: "pizza_lover",
    avatar: "https://i.pravatar.cc/100?img=33",
    description: "Wood fired perfection 🍕 #pizza #italian",
    videoUrl: "/public/videos/reel_03.mp4", // Food
    likes: "45K",
    isFood: true,
    product: {
      id: 103,
      restaurant_name: "Pizza Hut",
      item_name: "Pepperoni Pizza",
      price: 550,
      rating: 4.2,
      delivery_time_min: 45
    }
  }
];

// --- 2. SINGLE REEL COMPONENT ---
const ReelItem = ({ data, isFoodieMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="relative w-full h-[800px] snap-start flex-shrink-0 bg-black overflow-hidden border-b border-gray-800">

      {/* BACKGROUND VIDEO */}
      <video
        src={data.videoUrl}
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop
        muted
        autoPlay
        playsInline
      />

      {/* RIGHT SIDEBAR ACTIONS */}
      <div className="absolute bottom-24 right-4 z-30 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <Heart
            size={28}
            className={`cursor-pointer drop-shadow-lg transition-transform active:scale-75 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
            onClick={() => setIsLiked(!isLiked)}
          />
          <span className="text-white text-xs font-medium drop-shadow-md">{data.likes}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MessageCircle size={28} className="text-white drop-shadow-lg" />
          <span className="text-white text-xs font-medium drop-shadow-md">120</span>
        </div>
        <Send size={28} className="text-white -rotate-12 drop-shadow-lg" />
        <MoreHorizontal size={28} className="text-white drop-shadow-lg" />
        <div className="w-8 h-8 rounded-lg border-2 border-white bg-gray-800 mt-4 overflow-hidden">
          <img src={data.avatar} className="w-full h-full object-cover animate-spin-slow" />
        </div>
      </div>

      {/* BOTTOM INFO OVERLAY */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-6 pt-20 flex flex-col items-start">

        {/* === THE ZOMATO BUTTON (Logic: Only if Mode is ON AND it is food) === */}
        {isFoodieMode && data.isFood && (
          <button
            onClick={() => setIsSheetOpen(true)}
            className="mb-4 bg-[#E23744] hover:bg-[#c21f2d] text-white px-5 py-2.5 rounded-lg flex items-center gap-2.5 font-bold shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-500 active:scale-95 transition-transform"
          >
            <ShoppingBag size={18} fill="white" />
            <span className="text-sm">Order Now • ₹{data.product.price}</span>
          </button>
        )}

        {/* User Profile */}
        <div className="flex items-center gap-3 mb-3">
          <img src={data.avatar} className="w-9 h-9 rounded-full border border-white" />
          <span className="text-white font-bold text-sm drop-shadow-md mr-2">{data.username}</span>
          <button className="text-white text-xs border border-white/60 px-3 py-1 rounded-md backdrop-blur-md font-semibold">Follow</button>
        </div>

        {/* Caption */}
        <p className="text-white text-sm leading-snug drop-shadow-md mb-3 max-w-[85%]">
          {data.description}
        </p>

        {/* Audio Tag */}
        <div className="flex items-center gap-2 opacity-90 mb-4">
          <Music size={14} className="text-white" />
          <p className="text-white text-xs">Original Audio - {data.username}</p>
        </div>
      </div>

      {/* ZOMATO BOTTOM SHEET */}
      {data.product && (
        <ZomatoBottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          product={data.product}
        />
      )}
    </div>
  );
};

// --- 3. MAIN APP COMPONENT ---
export default function FoodieModeApp() {
  const [isFoodieMode, setIsFoodieMode] = useState(false);

  // LOGIC: Filter the reels based on the mode!
  const displayReels = isFoodieMode
    ? REELS_DATA.filter(reel => reel.isFood === true) // Only Food
    : REELS_DATA; // Show Everything

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-4 font-sans">

      {/* PHONE CONTAINER */}
      <div className="relative w-full max-w-[400px] h-[800px] bg-black rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl">

        {/* TOP HEADER (Fixed on top of scroll) */}
        <div className="absolute top-0 left-0 right-0 pt-8 px-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <h1 className="text-white font-bold text-2xl tracking-wide drop-shadow-md">Reels</h1>

          {/* TOGGLE BUTTON (Pointer events enabled) */}
          <button
            onClick={() => setIsFoodieMode(!isFoodieMode)}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl transition-all duration-300 border shadow-lg ${isFoodieMode
              ? "bg-green-500/20 border-green-400 text-green-400"
              : "bg-white/10 border-white/20 text-white"
              }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isFoodieMode ? "bg-green-400" : "bg-gray-400"}`} />
            <span className="text-xs font-bold tracking-wide">
              {isFoodieMode ? "Foodie Mode ON" : "Foodie Mode OFF"}
            </span>
          </button>
        </div>

        {/* SCROLLABLE FEED CONTAINER */}
        <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {displayReels.map((reel) => (
            <ReelItem key={reel.id} data={reel} isFoodieMode={isFoodieMode} />
          ))}
        </div>

      </div>
    </div>
  );
}
