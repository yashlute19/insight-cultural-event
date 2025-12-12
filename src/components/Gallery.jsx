"use client"
import DomeGallery from './DomeGallery'
import { useState } from "react"
import { galleryData } from "../data/gallery"

export default function Gallery() {
  return (
    <section id="gallery" className="pt-10 sm:pt-12 pb-16 bg-transparent">
      {/* Title: visible only on mobile/small screens */}
      <div className="md:hidden relative mb-8 px-4 text-center">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-3xl pointer-events-none"/>
        
        <h2 className="relative text-4xl sm:text-5xl font-cinzel text-white carnival-font medieval-glow drop-shadow-lg">
          Gallery
        </h2>
      </div>

      {/* Dome Gallery: responsive sizing */}
      <div className="w-full flex justify-center overflow-visible">
        {/* Mobile view: smaller height, contained */}
        <div className="md:hidden px-2" style={{ width: '100%', height: '500px' }}>
          <DomeGallery 
            images={galleryData}
            fit={0.4}
            minRadius={400}
            maxRadius={Infinity}
            padFactor={0.02}
            overlayBlurColor="transparent"
            maxVerticalRotationDeg={6}
            dragSensitivity={6}
            enlargeTransitionMs={300}
            segments={24}
            dragDampening={2}
            openedImageWidth="330px"
            openedImageHeight="330px"
            imageBorderRadius="4px"
            openedImageBorderRadius="20px"
            grayscale={false}
          />
        </div>

        {/* Desktop view: centered, fully visible with smaller segments */}
        <div className="hidden md:flex md:justify-center -mt-14 mb-40 md:items-center relative w-85%" style={{ height: '700px', overflow: 'visible' }}>
          <div style={{ width: '87vw', height: '95vh', overflow: 'visible' }}>
            <DomeGallery 
              images={galleryData}
              fit={0.5}
              minRadius={290}
              maxRadius={Infinity}
              padFactor={0.02}
              overlayBlurColor="transparent"
              maxVerticalRotationDeg={5}
              dragSensitivity={20}
              enlargeTransitionMs={300}
              segments={28}
              dragDampening={3}
              openedImageWidth="500px"
              openedImageHeight="500px"
              imageBorderRadius="5px"
              openedImageBorderRadius="20px"
              grayscale={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}