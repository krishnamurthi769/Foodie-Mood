import React, { useState } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, ShoppingBag, Music, X, Minus, Plus, Check, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. DATA (Simulating Database) ---
// Import Videos
import reel1 from './assets/videos/reel_01.mp4';
import reel2 from './assets/videos/reel_02.mp4';
import reel3 from './assets/videos/reel_03.mp4';

// --- 1. DATA (Simulating Database) ---
const REELS_DATA = [
  {
    id: 1,
    username: "burger_king_fan",
    avatar: "https://i.pravatar.cc/100?img=12",
    description: "Juiciest burger in town! 🍔 #foodie #cheatday",
    videoUrl: reel1, // Local video
    likes: "12.4K",
    isFood: true,
    product: { name: "Double Cheese Burger", price: 350, restaurant: "Burger King", rating: "4.5", time: "30 mins" }
  },
  {
    id: 2,
    username: "travel_diaries",
    avatar: "https://i.pravatar.cc/100?img=20",
    description: "Peaceful vibes in Bali 🌊 #travel #nature",
    videoUrl: reel2, // Nature (NOT Food)
    likes: "8.2K",
    isFood: false, // This will be HIDDEN in Foodie Mode
    product: null
  },
  {
    id: 3,
    username: "pizza_lover",
    avatar: "https://i.pravatar.cc/100?img=33",
    description: "Wood fired perfection 🍕 #pizza #italian",
    videoUrl: reel3, // Food
    likes: "45K",
    isFood: true,
    product: { name: "Pepperoni Pizza", price: 550, restaurant: "Pizza Hut", rating: "4.2", time: "45 mins" }
  }
];

// --- 2. BOTTOM SHEET COMPONENT (Dynamic Branding) ---
const BottomSheet = ({ product, platform, onClose }) => {
  const [step, setStep] = useState('cart'); // 'cart', 'loading', 'success'

  // Dynamic Colors based on Platform
  const brandColor = platform === 'swiggy' ? 'bg-[#FC8019]' : 'bg-[#E23744]';
  const brandName = platform === 'swiggy' ? 'Swiggy' : 'Zomato';

  const handleOrder = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full z-50">
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-50 bg-white rounded-t-3xl shadow-2xl overflow-hidden h-[60%]"
      >
        <div className="w-full flex justify-center pt-4 pb-2 shrink-0" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {step === 'cart' && (
          <>
            <div className="p-5 pb-28 overflow-y-auto h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-extrabold text-gray-900">{product.restaurant}</h2>
                    <span className={`text-[10px] text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${brandColor}`}>
                      {brandName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      {product.rating} ★
                    </span>
                    <span className="text-gray-500 text-sm">• {product.time}</span>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-4 h-4 border-2 border-green-600 flex justify-center items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                    <p className="text-gray-900 font-medium">₹{product.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-lg px-2 py-1">
                  <Minus size={16} className="text-gray-600" />
                  <span className="font-bold text-gray-800">1</span>
                  <Plus size={16} className="text-gray-600" />
                </div>
              </div>
            </div>

            {/* ABSOLUTE FOOTER */}
            <div className="absolute bottom-0 left-0 w-full p-5 pt-4 pb-8 border-t border-gray-100 bg-white z-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-extrabold text-gray-900 text-xl">₹{product.price}</span>
              </div>

              <button
                onClick={handleOrder}
                className={`w-full ${brandColor} text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform`}
              >
                Place Order on {brandName}
              </button>
            </div>
          </>
        )}

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center h-full pb-10">
            <div className={`w-12 h-12 border-4 border-gray-200 border-t-transparent rounded-full animate-spin mb-4 ${platform === 'swiggy' ? 'border-t-orange-500' : 'border-t-red-600'}`}></div>
            <h3 className="text-lg font-bold text-gray-700">Connecting to {brandName}...</h3>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-10 h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm animate-in zoom-in duration-300"
            >
              <Check size={48} className="text-green-600" strokeWidth={4} />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-500 mb-10 text-center text-lg px-4">
              Your <span className="font-bold text-gray-800">{product.name}</span> is being prepared.
            </p>
            <button onClick={onClose} className="text-red-500 font-bold hover:bg-red-50 px-10 py-3 rounded-full transition-colors border-2 border-red-100">
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- 3. REEL ITEM (With Floating Icons) ---
const ReelItem = ({ data, isFoodieMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // Controls the floating bubbles
  const [selectedPlatform, setSelectedPlatform] = useState(null); // 'zomato' or 'swiggy'

  const handleOptionClick = (platform) => {
    setSelectedPlatform(platform);
    setShowOptions(false);
  };

  return (
    <div className="relative w-full h-full snap-start flex-shrink-0 bg-black overflow-hidden border-b border-gray-800">

      <video src={data.videoUrl} className="absolute top-0 left-0 w-full h-full object-cover" loop muted autoPlay playsInline />

      {/* RIGHT SIDEBAR */}
      <div className="absolute bottom-24 right-4 z-30 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <Heart size={28} className={`cursor-pointer drop-shadow-lg transition-transform active:scale-75 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} onClick={() => setIsLiked(!isLiked)} />
          <span className="text-white text-xs font-medium drop-shadow-md">{data.likes}</span>
        </div>
        <MessageCircle size={28} className="text-white drop-shadow-lg" />
        <Send size={28} className="text-white -rotate-12 drop-shadow-lg" />
        <div className="w-8 h-8 rounded-lg border-2 border-white bg-gray-800 mt-4 overflow-hidden">
          <img src={data.avatar} className="w-full h-full object-cover animate-spin-slow" />
        </div>
      </div>

      {/* BOTTOM OVERLAY */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-6 pt-32 flex flex-col items-start">

        {/* --- FLOATING ORDER BUTTONS --- */}
        {isFoodieMode && data.isFood && (
          <div className="mb-4 relative">
            <AnimatePresence>
              {showOptions && (
                <>
                  {/* Zomato Bubble */}
                  <motion.button
                    initial={{ y: 0, opacity: 0, scale: 0.5 }}
                    animate={{ y: -60, x: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 0, opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => handleOptionClick('zomato')}
                    className="absolute bottom-0 left-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-gray-100 overflow-hidden p-2"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg" alt="Zomato" className="w-full h-full object-contain" />
                  </motion.button>

                  {/* Swiggy Bubble */}
                  <motion.button
                    initial={{ y: 0, opacity: 0, scale: 0.5 }}
                    animate={{ y: -60, x: 60, opacity: 1, scale: 1 }}
                    exit={{ y: 0, opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.05 }}
                    onClick={() => handleOptionClick('swiggy')}
                    className="absolute bottom-0 left-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-gray-100 overflow-hidden p-2"
                  >
                    <img src="/images/swiggy_logo.png" alt="Swiggy" className="w-full h-full object-contain" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Main CTA Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOptions(!showOptions)}
              className="bg-white text-black px-5 py-2.5 rounded-full flex items-center gap-2 font-bold shadow-xl z-20 relative"
            >
              <ShoppingBag size={18} className="text-black" />
              <span className="text-sm">Order Now • ₹{data.product.price}</span>
            </motion.button>
          </div>
        )}

        {/* User Info & Caption */}
        <div className="flex items-center gap-3 mb-3">
          <img src={data.avatar} className="w-9 h-9 rounded-full border border-white" />
          <span className="text-white font-bold text-sm drop-shadow-md mr-2">{data.username}</span>
          <button className="text-white text-xs border border-white/60 px-3 py-1 rounded-md backdrop-blur-md font-semibold">Follow</button>
        </div>
        <p className="text-white text-sm leading-snug drop-shadow-md mb-3 max-w-[85%]">{data.description}</p>
        <div className="flex items-center gap-2 opacity-90 mb-4">
          <Music size={14} className="text-white" />
          <p className="text-white text-xs">Original Audio - {data.username}</p>
        </div>
      </div>

      {/* RENDER BOTTOM SHEET */}
      <AnimatePresence>
        {selectedPlatform && (
          <BottomSheet
            product={data.product}
            platform={selectedPlatform}
            onClose={() => setSelectedPlatform(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 4. MAIN APP ---
export default function FoodieModeApp() {
  const [isFoodieMode, setIsFoodieMode] = useState(false);
  const displayReels = isFoodieMode ? REELS_DATA.filter(reel => reel.isFood) : REELS_DATA;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-4 font-sans">
      <div className="relative w-full max-w-[400px] h-[90vh] max-h-[850px] bg-black rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl">

        {/* HEADER */}
        <div className="absolute top-0 left-0 right-0 pt-8 px-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <h1 className="text-white font-bold text-2xl tracking-wide drop-shadow-md">Reels</h1>
          <button
            onClick={() => setIsFoodieMode(!isFoodieMode)}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl transition-all duration-300 border shadow-lg ${isFoodieMode ? "bg-green-500/20 border-green-400 text-green-400" : "bg-white/10 border-white/20 text-white"
              }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isFoodieMode ? "bg-green-400" : "bg-gray-400"}`} />
            <span className="text-xs font-bold tracking-wide">{isFoodieMode ? "Foodie Mode ON" : "Foodie Mode OFF"}</span>
          </button>
        </div>

        {/* FEED */}
        <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {displayReels.map((reel) => (
            <ReelItem key={reel.id} data={reel} isFoodieMode={isFoodieMode} />
          ))}
        </div>
      </div>
    </div>
  );
}
