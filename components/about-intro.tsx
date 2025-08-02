"use client"

import { useState, useEffect, useRef } from "react"
import { Users, Target, Award, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AboutIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Our Team",
      description: "Meet the passionate people behind ComponentHub",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      shadowColor: "shadow-blue-500/25",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description: "Empowering developers worldwide",
      gradient: "from-green-500 via-teal-500 to-cyan-500",
      shadowColor: "shadow-green-500/25",
      bgColor: "bg-green-50",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Our Values",
      description: "Quality, innovation, and community first",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      shadowColor: "shadow-orange-500/25",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Our Story",
      description: "Building the future of web development",
      gradient: "from-purple-500 via-indigo-500 to-blue-500",
      shadowColor: "shadow-purple-500/25",
      bgColor: "bg-purple-50",
    },
  ]

  useEffect(() => {
    // Auto-hide after 16 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 16000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const element = animationRef.current
    if (!element) return

    if (isPaused) {
      // Pause the animation by setting animation-play-state
      element.style.animationPlayState = "paused"
    } else {
      // Resume the animation
      element.style.animationPlayState = "running"
    }
  }, [isPaused])

  const skipIntro = () => {
    setIsVisible(false)
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Create multiple sets of tiles for seamless infinite scroll
  const createTileSet = (setIndex: number) => {
    return steps.map((step, index) => (
      <div
        key={`set-${setIndex}-tile-${index}`}
        className="group relative p-8 rounded-3xl backdrop-blur-sm bg-white/90 shadow-2xl border-2 border-white/60 cursor-pointer transform hover:scale-105 transition-all duration-500 flex-shrink-0 w-80 mx-4"
        style={{
          minWidth: "320px",
        }}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-15 group-hover:opacity-20 transition-opacity duration-500`}
        />

        {/* Icon container with enhanced animations */}
        <div
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-6 text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${step.shadowColor} shadow-2xl`}
        >
          <div className="transition-transform duration-500 group-hover:animate-pulse">{step.icon}</div>

          {/* Continuous ripple effect */}
          <div className="absolute inset-0 rounded-2xl animate-ping bg-white/20 opacity-75"></div>
          <div className="absolute inset-0 rounded-2xl animate-pulse bg-white/10 delay-500"></div>
        </div>

        <h3
          className={`text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${step.gradient} group-hover:animate-pulse transition-all duration-500`}
        >
          {step.title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-700 font-medium group-hover:text-gray-800 transition-colors duration-500">
          {step.description}
        </p>

        {/* Active indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg">
          <div className="absolute inset-1 bg-white rounded-full"></div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Floating sparkles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000 opacity-80"></div>
      </div>
    ))
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements - Similar to Home Page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-2000"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rotate-45 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-indigo-400 rotate-12 animate-float-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-12 px-4 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <Badge variant="secondary" className="bg-white/80 text-blue-600 border-blue-200 shadow-lg">
            <Heart className="w-4 h-4 mr-1 animate-pulse" />
            About ComponentHub
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
              Our Story
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
            Discover the people and passion behind the platform
          </p>
        </div>

        {/* Seamless Infinite Scroll Container */}
        <div className="relative w-full h-80 overflow-hidden">
          {/* Infinite Scroll Track */}
          <div
            ref={animationRef}
            className="flex items-center h-full animate-infinite-scroll"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: "calc(200% + 100px)", // Extra width for seamless loop
            }}
          >
            {/* First set of tiles */}
            {createTileSet(0)}

            {/* Second set of tiles for seamless loop */}
            {createTileSet(1)}

            {/* Third set of tiles for extra seamlessness */}
            {createTileSet(2)}
          </div>

          {/* Gradient overlays for smooth edge blending */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 via-blue-50/80 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 via-blue-50/80 to-transparent pointer-events-none z-10"></div>

          {/* Flow indicators */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-3 h-12 bg-gradient-to-b from-green-500 to-blue-500 rounded-full shadow-lg animate-pulse"></div>
              <ArrowRight className="w-4 h-4 text-blue-600 animate-bounce" />
              <span className="text-xs text-gray-600 font-medium">Flow</span>
            </div>
          </div>
        </div>

        {/* Enhanced Skip Button */}
        <Button
          onClick={skipIntro}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
        >
          Continue to About
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Pause indicator */}
        {isPaused && (
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-20">
            <span className="text-sm text-gray-600 font-medium">Flow Paused</span>
          </div>
        )}
      </div>

      {/* Continuous Flow Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <div className="flex space-x-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.gradient} shadow-lg animate-pulse`}
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          ))}
        </div>
        <ArrowRight className="w-4 h-4 text-gray-600 animate-pulse" />
        <div className="flex space-x-2">
          {steps.map((step, index) => (
            <div
              key={`repeat-${index}`}
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.gradient} shadow-lg animate-pulse`}
              style={{ animationDelay: `${(index + 4) * 0.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* Flow Status */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <div className={`w-2 h-2 rounded-full ${isPaused ? "bg-red-500" : "bg-green-500 animate-pulse"}`}></div>
          <span className="font-medium">{isPaused ? "Flow Paused" : "Continuous Flow"}</span>
          <div className={`w-2 h-2 rounded-full ${isPaused ? "bg-red-500" : "bg-green-500 animate-pulse"}`}></div>
        </div>
      </div>

      {/* Custom CSS for seamless infinite scroll */}
      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-15px) rotate(225deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-10px) rotate(192deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 12s linear infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
