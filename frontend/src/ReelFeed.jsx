import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import axios from 'axios';

const ReelFeed = ({ foodieMode }) => {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReels = async () => {
            setLoading(true);
            try {
                const mode = foodieMode ? 'foodie' : 'normal';
                // Assuming backend is running on localhost:5000
                const response = await axios.get(`http://127.0.0.1:5000/api/feed?mode=${mode}`);
                setReels(response.data);
            } catch (error) {
                console.error("Error fetching reels:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReels();
    }, [foodieMode]);

    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-instagram-dark">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
            {reels.map((reel) => (
                <VideoPlayer key={reel.id} reel={reel} />
            ))}
        </div>
    );
};

export default ReelFeed;
