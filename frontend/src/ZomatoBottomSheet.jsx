import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Minus, Plus, Check } from 'lucide-react';

const ZomatoBottomSheet = ({ isOpen, onClose, product }) => {
    const [quantity, setQuantity] = useState(1);
    const [step, setStep] = useState('cart'); // 'cart', 'loading', 'success'

    const handleOrder = () => {
        setStep('loading');
        // Simulate network request
        setTimeout(() => {
            setStep('success');
        }, 1500);
    };

    const handleClose = () => {
        onClose();
        // Reset state after animation
        setTimeout(() => {
            setStep('cart');
            setQuantity(1);
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="absolute bottom-0 left-0 right-0 bg-white text-black z-50 rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ maxHeight: '85%' }}
                    >
                        {/* Handle */}
                        <div className="w-full flex justify-center pt-4 pb-2 shrink-0" onClick={handleClose}>
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="p-6 pb-12 overflow-y-auto flex-1">

                            {/* --- STEP 1: CART VIEW --- */}
                            {step === 'cart' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-gray-900">{product.restaurant_name}</h2>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                                                    {product.rating} <Star size={10} fill="currentColor" />
                                                </span>
                                                <span className="text-gray-500 text-sm">• {product.delivery_time_min} mins</span>
                                            </div>
                                        </div>
                                        <button onClick={handleClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                            <X size={20} className="text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className="w-4 h-4 border-2 border-green-600 flex justify-center items-center rounded-[2px]">
                                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-lg">{product.item_name}</h3>
                                                <p className="text-gray-900 font-medium">₹{product.price}</p>
                                            </div>
                                        </div>

                                        {/* Counter */}
                                        <div className="flex items-center gap-3 border border-pink-200 bg-pink-50 rounded-lg px-2 py-1">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1">
                                                <Minus size={16} className="text-pink-600" />
                                            </button>
                                            <span className="font-bold text-pink-600 w-4 text-center">{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} className="p-1">
                                                <Plus size={16} className="text-pink-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Footer / Total */}
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-bold text-gray-900 text-lg">Total</span>
                                        <span className="font-extrabold text-gray-900 text-xl">₹{product.price * quantity}</span>
                                    </div>

                                    {/* PLACE ORDER BUTTON */}
                                    <button
                                        onClick={handleOrder}
                                        className="w-full bg-[#E23744] hover:bg-[#c21f2d] text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center mb-4"
                                    >
                                        Place Order
                                    </button>
                                </motion.div>
                            )}

                            {/* --- STEP 2: LOADING VIEW --- */}
                            {step === 'loading' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 h-full"
                                >
                                    <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-6"></div>
                                    <h3 className="text-xl font-bold text-gray-700">Placing your order...</h3>
                                </motion.div>
                            )}

                            {/* --- STEP 3: SUCCESS VIEW --- */}
                            {step === 'success' && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-10 h-full"
                                >
                                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm animate-in zoom-in duration-300">
                                        <Check size={48} className="text-green-600" strokeWidth={4} />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed!</h2>
                                    <p className="text-gray-500 mb-10 text-center text-lg px-4">
                                        Your <span className="font-bold text-gray-800">{product.item_name}</span> is being prepared.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="text-red-500 font-bold hover:bg-red-50 px-10 py-3 rounded-full transition-colors border-2 border-red-100"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ZomatoBottomSheet;
