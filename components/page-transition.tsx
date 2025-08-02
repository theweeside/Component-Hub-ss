"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface PageTransitionProps {
  isTransitioning: boolean
  targetPage: string
  onTransitionComplete: () => void
}

export default function PageTransition({ isTransitioning, targetPage, onTransitionComplete }: PageTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "expanding" | "complete" | "revealing">("idle")
  const router = useRouter()

  useEffect(() => {
    if (isTransitioning && phase === "idle") {
      // Start the transition
      setPhase("expanding")

      // After expansion animation completes
      setTimeout(() => {
        setPhase("complete")

        // Navigate to the target page
        router.push(targetPage)

        // Start revealing the new page
        setTimeout(() => {
          setPhase("revealing")

          // Complete the transition
          setTimeout(() => {
            setPhase("idle")
            onTransitionComplete()
          }, 1200)
        }, 100)
      }, 1500)
    }
  }, [isTransitioning, phase, targetPage, router, onTransitionComplete])

  if (!isTransitioning && phase === "idle") return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Liquid Blob Transition */}
      <div className="absolute inset-0">
        {/* Main Blob Shape */}
        <div
          className={`absolute bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 transition-all duration-1500 ease-out ${
            phase === "expanding" || phase === "complete"
              ? "opacity-100"
              : phase === "revealing"
                ? "opacity-0"
                : "opacity-0"
          }`}
          style={{
            clipPath:
              phase === "expanding" || phase === "complete"
                ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                : "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            transition: "clip-path 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.2s ease-out",
            width: "100%",
            height: "100%",
          }}
        />

        {/* Organic Blob Shapes */}
        <div
          className={`absolute bg-gradient-to-br from-blue-500 to-blue-600 transition-all duration-1200 ease-out ${
            phase === "expanding" || phase === "complete"
              ? "opacity-90 scale-150"
              : phase === "revealing"
                ? "opacity-0 scale-200"
                : "opacity-0 scale-50"
          }`}
          style={{
            width: "120%",
            height: "120%",
            left: "-10%",
            top: "-10%",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            transform: `scale(${phase === "expanding" || phase === "complete" ? "1.5" : phase === "revealing" ? "2" : "0.5"}) rotate(${phase === "expanding" ? "45deg" : "0deg"})`,
            transition: "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}
        />

        {/* Secondary Blob */}
        <div
          className={`absolute bg-gradient-to-tl from-blue-500 to-blue-500 transition-all duration-1000 ease-out ${
            phase === "expanding" || phase === "complete"
              ? "opacity-70 scale-125"
              : phase === "revealing"
                ? "opacity-0 scale-175"
                : "opacity-0 scale-25"
          }`}
          style={{
            width: "80%",
            height: "80%",
            right: "-20%",
            bottom: "-20%",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: `scale(${phase === "expanding" || phase === "complete" ? "1.25" : phase === "revealing" ? "1.75" : "0.25"}) rotate(${phase === "expanding" ? "-30deg" : "0deg"})`,
            transition: "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            animationDelay: "0.2s",
          }}
        />

        {/* Tertiary Blob */}
        <div
          className={`absolute bg-gradient-to-br from-blue-400 to-blue-500 transition-all duration-800 ease-out ${
            phase === "expanding" || phase === "complete"
              ? "opacity-60 scale-100"
              : phase === "revealing"
                ? "opacity-0 scale-150"
                : "opacity-0 scale-0"
          }`}
          style={{
            width: "60%",
            height: "60%",
            left: "-10%",
            bottom: "-15%",
            borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
            transform: `scale(${phase === "expanding" || phase === "complete" ? "1" : phase === "revealing" ? "1.5" : "0"}) rotate(${phase === "expanding" ? "60deg" : "0deg"})`,
            transition: "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            animationDelay: "0.4s",
          }}
        />
      </div>

      {/* Animated Elements During Transition */}
      {(phase === "expanding" || phase === "complete") && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Floating Liquid Drops */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 rounded-full animate-float-drop"
                style={{
                  width: `${8 + i * 2}px`,
                  height: `${8 + i * 2}px`,
                  left: `${15 + i * 10}%`,
                  top: `${20 + i * 8}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + i * 0.2}s`,
                }}
              />
            ))}
          </div>

          {/* Central Loading Element */}
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Liquid Ripples */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-white/10 rounded-full animate-liquid-ripple"></div>
            <div className="absolute w-48 h-48 border border-white/5 rounded-full animate-liquid-ripple animation-delay-500"></div>
            <div className="absolute w-64 h-64 border border-white/3 rounded-full animate-liquid-ripple animation-delay-1000"></div>
          </div>

          {/* Page Title Animation */}
          {targetPage === "/pricing" && (
            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 z-10">
              <h2 className="text-4xl font-bold text-white animate-fade-in-up drop-shadow-lg">Loading Pricing</h2>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-liquid-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-liquid-bounce animation-delay-200"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-liquid-bounce animation-delay-400"></div>
              </div>
            </div>
          )}

          {/* Contact Page Title Animation */}
          {targetPage === "/contact" && (
            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 z-10">
              <h2 className="text-4xl font-bold text-white animate-fade-in-up drop-shadow-lg">Loading Contact</h2>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-liquid-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-liquid-bounce animation-delay-200"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-liquid-bounce animation-delay-400"></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-drop {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(15px) scale(1.2); 
            opacity: 0.8;
          }
        }
        
        @keyframes liquid-ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes liquid-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float-drop {
          animation: float-drop 3s ease-in-out infinite;
        }
        
        .animate-liquid-ripple {
          animation: liquid-ripple 2s ease-out infinite;
        }
        
        .animate-liquid-bounce {
          animation: liquid-bounce 1.5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
