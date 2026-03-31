'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const cards = [
  {
    id: 1,
    title: 'Card 1',
    description: 'Card 1 description',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5',
    accentColor: '#E8A87C',      // warm amber
    shadowColor: 'rgba(232,168,124,0.45)',
    borderColor: 'rgba(232,168,124,0.35)',
    config :{
        x: 40,
        y: 20,
        rotate: -7,
    }
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'Card 3 description',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
    accentColor: '#7EB8A4',      // sage green
    shadowColor: 'rgba(126,184,164,0.45)',
    borderColor: 'rgba(126,184,164,0.35)',
    config :{
        x: 10,
        y: 15,
        rotate: 7,
    }
  },
  {
    id: 4,
    title: 'Card 4',
    description: 'Card 4 description',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3',
    accentColor: '#C97FA8',      // dusty rose
    shadowColor: 'rgba(201,127,168,0.45)',
    borderColor: 'rgba(201,127,168,0.35)',
    config :{
        x: -8,
        y: 10,
        rotate: -5,
    }
  },
  {
    id: 5,
    title: 'Card 5',
    description: 'Card 5 description',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    accentColor: '#7A9CC4',      // slate blue
    shadowColor: 'rgba(122,156,196,0.45)',
    borderColor: 'rgba(122,156,196,0.35)',
    config :{
        x: -14,
        y: 10,
        rotate: 5,
    }
  },
]

export default function Page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#0e0e0e]">
      {cards.map((card, i) => (
        <CardUi key={card.id} card={card} index={i} />
      ))}
    </div>
  )
}

function CardUi({ card, index }: { card: typeof cards[number]; index: number }) {



function selectedCard(index: number) {
    console.log(index);
}

  return (
    <motion.div
animate={
{
    x: card.config.x,
    y: card.config.y,
    rotate: card.config.rotate,
}}
transition={{
    type: 'spring',
    stiffness: 100,
    damping: 10,
    duration: 0.3,
    ease: 'easeInOut',
}}

      className="group relative bg-black w-[190px] h-[260px] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
      style={{
        border: `1px solid ${card.borderColor}`,
        boxShadow: `0 0 0 0 ${card.shadowColor}`,
        animationDelay: `${index * 80}ms`,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
      }}
   
    >
      {/* Photo */}
    
      {/* Gradient overlay — accent color tinted at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to top,
            ${card.accentColor}cc 0%,
            ${card.accentColor}22 45%,
            transparent 70%
          )`,
        }}
      />

      {/* Top accent line */}
    

      {/* Text content */}
      <div className="absolute  bottom-0 left-0 right-0 p-4">
        <p
          className="text-[10px] uppercase tracking-[0.18em] mb-1 font-medium"
          style={{ color: card.accentColor, fontFamily: 'monospace' }}
        >
          #{String(card.id).padStart(2, '0')}
        </p>
        <h2
          className="text-white text-base font-semibold leading-tight mb-1"
          style={{ fontFamily: "'Georgia', serif", textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
        >
          {card.title}
        </h2>
        <p className="text-white/60 text-[11px] leading-snug">
          {card.description}
        </p>
      </div>
    </motion.div>
  )
}