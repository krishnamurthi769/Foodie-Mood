import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, ShoppingBag, Music } from 'lucide-react';
import ZomatoBottomSheet from './ZomatoBottomSheet';

const VideoPlayer = ({ reel }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Intersection Observer to play/pause based on visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        // Attempt to play. Muted is required for autoplay in most browsers.
                        videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
                        setIsPlaying(true);
                    }
                } else {
                    if (videoRef.current) {
                        videoRef.current.pause();
                        setIsPlaying(false);
                    }
                }
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="h-full w-full snap-start relative bg-black">
            {/* 1. BACKGROUND VIDEO */}
            <video
                ref={videoRef}
                src={reel.video_url}
                className="absolute top-0 left-0 w-full h-full object-cover"
                loop
                muted
                autoPlay
                playsInline
                onClick={togglePlay}
            />

            {/* 2. RIGHT SIDEBAR ACTIONS (Icons) */}
            <div className="absolute bottom-24 right-4 z-30 flex flex-col items-center gap-6 pointer-events-auto">
                <div className="flex flex-col items-center gap-1">
                    <Heart
                        size={28}
                        strokeWidth={2}
                        className={`transition-transform active:scale-75 cursor-pointer drop-shadow-lg ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
                        onClick={() => setIsLiked(!isLiked)}
                    />
                    <span className="text-white text-xs font-medium drop-shadow-md">{reel.likes_count}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <MessageCircle size={28} strokeWidth={2} className="text-white drop-shadow-lg" />
                    <span className="text-white text-xs font-medium drop-shadow-md">128</span>
                </div>

                <Send size={28} strokeWidth={2} className="text-white -rotate-12 drop-shadow-lg" />
                <MoreHorizontal size={28} strokeWidth={2} className="text-white drop-shadow-lg" />

                {/* Album Art Icon */}
                <div className="w-8 h-8 rounded-lg border-2 border-white bg-gray-800 mt-4 overflow-hidden">
                    <img src={reel.avatar_url} className="w-full h-full object-cover animate-spin-slow" />
                </div>
            </div>

            {/* 3. BOTTOM INFO OVERLAY (Username, Caption, Order Button) */}
            <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-8 pt-20 flex flex-col items-start pointer-events-auto">

                {/* === THE ZOMATO BUTTON === */}
                {/* Only visible if product exists */}
                {reel.product && (
                    <button
                        onClick={() => setIsSheetOpen(true)}
                        className="mb-4 bg-[#E23744] hover:bg-[#c21f2d] text-white px-5 py-2.5 rounded-lg flex items-center gap-2.5 font-bold shadow-xl transform transition-all active:scale-95 animate-in slide-in-from-bottom-5 fade-in duration-500"
                    >
                        <ShoppingBag size={18} fill="white" />
                        <span className="text-sm">Order Now • ₹{reel.product.price}</span>
                    </button>
                )}

                {/* User Profile Line */}
                <div className="flex items-center gap-3 mb-3">
                    <img src={reel.avatar_url} className="w-9 h-9 rounded-full border border-white shadow-sm" />
                    <span className="text-white font-bold text-sm drop-shadow-md mr-2">{reel.username}</span>
                    <button className="text-white text-xs border border-white/60 px-3 py-1 rounded-md backdrop-blur-md font-semibold hover:bg-white/10 transition-colors">Follow</button>
                </div>

                {/* Caption */}
                <p className="text-white text-sm leading-snug drop-shadow-md mb-3 max-w-[85%]">
                    {reel.description}
                </p>

                {/* Audio Tag */}
                <div className="flex items-center gap-2 opacity-90 mb-4">
                    <Music size={14} className="text-white" />
                    <div className="w-32 overflow-hidden">
                        <p className="text-white text-xs whitespace-nowrap">Original Audio - {reel.username} • Trending</p>
                    </div>
                </div>
            </div>

            {/* Zomato Bottom Sheet */}
            {reel.product && (
                <ZomatoBottomSheet
                    isOpen={isSheetOpen}
                    onClose={() => setIsSheetOpen(false)}
                    product={reel.product}
                />
            )}
        </div>
    );
};

export default VideoPlayer;
