'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const ClickableCard = () => {
  const [loaded, setLoaded] = useState(false); // State to control the fade-in animation

  const cards = [
    {
      title: 'Monthly Wrapped.',
      imageUrl: '/1.jpg', // Replace with your first image URL
      href: '/wrapped'
    },
    {
      title: 'Your week in a glance.',
      imageUrl: '/2.jpg', // Replace with your second image URL
      href: '/wrapped'
    },
  ];

  // Simulate loading with setTimeout to trigger fade-in
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true); // Set loaded to true after 500ms
    }, 500); // 500ms delay before fading in

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center space-x-10 p-4">
      {cards.map((card, index) => (
        <Link key={index} href={card.href}>
          <div
            className={`relative w-[350px] h-[600px] rounded-[30px] overflow-hidden shadow-md flex items-end transition-all duration-500 ease-in-out transform ${
              loaded ? 'opacity-100' : 'opacity-0'
            } hover:scale-105 hover:opacity-90`} // Smooth scaling with opacity change on hover
            style={{
              backgroundImage: `url(${card.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Text Positioned at the Top */}
            <div className="absolute top-0 left-0 p-5 bg-gradient-to-b from-black/70 via-black/40 to-transparent text-white w-full">
              <h3 className="text-lg font-semibold px-1.5 py-1.5">{card.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ClickableCard;
