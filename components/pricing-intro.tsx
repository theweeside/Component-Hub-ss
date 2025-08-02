"use client"

import { useState, useEffect, useRef } from "react"
import { DollarSign, Zap, Crown, Building, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PricingIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentPlan, setCurrentPlan] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const plans = [
    {
      icon: <Zap className="w-6 h-6" />,
      name: "Starter",
      price: "Free",
      color: "from-green-400 to-blue-500",
      features: ["50+ Components", "Basic Support"],
    },
    {
      icon: <Crown className="w-6 h-6" />,
      name: "Pro",
      price: "$29",
      color: "from-purple-400 to-pink-500",
      features: ["500+ Components", "Priority Support", "Custom Themes"],
    },
    {
      icon: <Building className="w-6 h-6" />,
      name: "Enterprise",
      price: "Custom",
      color: "from-orange-400 to-red-500",
      features: ["Unlimited", "Dedicated Support", "White-label"],
    },
  ]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }

    video.addEventListener("ended", handleEnded)

    // Auto-cycle through plans
    const interval = setInterval(() => {
      setCurrentPlan((prev) => (prev + 1) % plans.length)
    }, 2000)

    // Auto-hide after 8 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 8000)

    return () => {
      video.removeEventListener("ended", handleEnded)
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [plans.length])

  const skipIntro = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        autoPlay
        muted
        playsInline
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-08-01%20at%2012.19.57%20AM%20%281%29-BsizhRZDSXx4UmgEtLNpO8dw1cLFsc.mp4" type="video/mp4" />
      </video>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-purple-400 rounded-full animate-bounce delay-1500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white space-y-8 px-4 max-w-6xl mx-auto">
        <div className="space-y-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <DollarSign className="w-4 h-4 mr-1" />
            Pricing Plans
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400">
              Choose Your Plan
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto">Find the perfect plan for your needs</p>
        </div>

        {/* Animated Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl backdrop-blur-sm transition-all duration-700 transform ${
                index === currentPlan
                  ? "bg-white/20 scale-110 border-2 border-white/50 shadow-2xl"
                  : "bg-white/10 border border-white/20 scale-95"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-6 text-white transition-transform duration-500 ${
                  index === currentPlan ? "scale-110" : ""
                }`}
              >
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">
                {plan.price}
                {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-lg text-blue-200">/mo</span>}
              </div>
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skip Button */}
        <Button
          onClick={skipIntro}
          variant="outline"
          className="group bg-transparent border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 mt-8"
        >
          View All Plans
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Plan Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {plans.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentPlan ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
