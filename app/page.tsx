"use client";

import Link from "next/link";

const appFolders = [
  { title: "Gooey Button", url: "Gooeybutton" },
  { title: "Horizontal Scrolling", url: "HorizontalScroling" },
  { title: "Magnetic Text", url: "MagneticText" },
  { title: "Particle Morph System", url: "ParticleMorphSystemWithGooeyEffect" },
  { title: "Shimmer Accordion", url: "Shimmeraccordion" },
  { title: "Typewriter Shimmer", url: "TypeWrittingShimmer" },
  { title: "Animated Testimonials", url: "animatedTestimonials" },
  { title: "Automatic Shimmer", url: "automaticShimmerText" },
  { title: "Check Component", url: "check" },
  { title: "Count Animation", url: "count" },
  { title: "Dock Component", url: "dock" },
  { title: "Horizontal Curved Menu", url: "horizontalCurvedMenu" },
  { title: "Image Drag Effect", url: "image-drag-effect" },
  { title: "iOS App Folder", url: "ios-app-folder" },
  { title: "Magnetic Cursor", url: "magneticCursor" },
  { title: "Mask Cursor", url: "maskCursor" },
  { title: "Modern Cards", url: "modernCards" },
  { title: "Morph Effect", url: "morph" },
  { title: "Morph Text", url: "morphText" },
  { title: "Mountain Animation", url: "mountain" },
  { title: "Moving Border", url: "movingBorder" },
  { title: "Multi-step Component", url: "multi-step-component" },
  { title: "Order Images", url: "orderImages" },
  { title: "Parallax", url: "parallax" },
  { title: "Parallax Cards", url: "parallaxCards" },
  { title: "Parallax Images", url: "parallaxImages" },
  { title: "Reveal Text", url: "revealText" },
  { title: "Stairs Animation", url: "stairsanimation" },
  { title: "SVG Path", url: "svgPath" },
  { title: "Test Component", url: "test" },
  { title: "Tilt Card", url: "tiltCard" },
  { title: "Trash Interaction", url: "trash-interaction" },
  { title: "Vertical Curved Menu", url: "verticalCurvedMenu" },
  { title: "Wavey Button", url: "waveyButton" },
  { title: "Workspace", url: "workspace" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Web Components</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {appFolders.map(({ title, url }) => (
          <Link
            key={url}
            href={`/${url}`}
            className="group block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="aspect-square bg-gray-700 rounded-md mb-4 flex items-center justify-center">
              <div className="text-gray-400 text-xs">IMG</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">
              Interactive component showcase
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
