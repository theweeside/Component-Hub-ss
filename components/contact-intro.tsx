"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ContactIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentContact, setCurrentContact] = useState(0)
  const [messageText, setMessageText] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "hello@componenthub.com",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "+1 (555) 123-4567",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "San Francisco, CA",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Available 24/7",
      color: "from-orange-400 to-red-500",
    },
  ]

  const messages = [
    "Hello! How can we help you today?",
    "We're here to answer your questions",
    "Let's build something amazing together",
    "Your success is our priority",
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

    // Auto-cycle through contact methods
    const contactInterval = setInterval(() => {
      setCurrentContact((prev) => (prev + 1) % contactMethods.length)
    }, 1800)

    // Typing effect for messages
    let messageIndex = 0
    let charIndex = 0
    const typeMessage = () => {
      if (charIndex < messages[messageIndex].length) {
        setMessageText(messages[messageIndex].substring(0, charIndex + 1))
        charIndex++
        setTimeout(typeMessage, 100)
      } else {
        setTimeout(() => {
          messageIndex = (messageIndex + 1) % messages.length
          charIndex = 0
          setMessageText("")
          setTimeout(typeMessage, 500)
        }, 2000)
      }
    }
    typeMessage()

    // Auto-hide after 10 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 10000)

    return () => {
      video.removeEventListener("ended", handleEnded)
      clearInterval(contactInterval)
      clearTimeout(timeout)
    }
  }, [contactMethods.length, messages])

  const skipIntro = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        playsInline
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-08-01%20at%2012.19.56%20AM-Z6VPO7eni74CN7n8DhjuFPF6V1tGVZ.mp4" type="video/mp4" />
      </video>

      {/* Animated Chat Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-10 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-8 bg-blue-400/30 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-20 h-12 bg-purple-400/30 rounded-full animate-float delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white space-y-8 px-4 max-w-6xl mx-auto">
        <div className="space-y-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <MessageCircle className="w-4 h-4 mr-1" />
            Let's Connect
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              Get in Touch
            </span>
          </h1>

          {/* Typing Message */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">ComponentHub Team</div>
                <div className="text-sm text-blue-200">Online now</div>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 min-h-[60px] flex items-center">
              <p className="text-lg">
                {messageText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 transform ${
                index === currentContact
                  ? "bg-white/20 scale-105 border-2 border-white/40 shadow-2xl"
                  : "bg-white/10 border border-white/20"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4 text-white transition-transform duration-500 ${
                  index === currentContact ? "scale-110 animate-pulse" : ""
                }`}
              >
                {method.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{method.title}</h3>
              <p className="text-sm text-blue-100">{method.description}</p>
            </div>
          ))}
        </div>

        {/* Skip Button */}
        <Button
          onClick={skipIntro}
          variant="outline"
          className="group bg-transparent border-white/30 text-white hover:bg-white hover:text-purple-600 transition-all duration-300 mt-8"
        >
          <Send className="w-4 h-4 mr-2" />
          Start Conversation
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Contact Method Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {contactMethods.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentContact ? "bg-white w-8" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
