"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function IntroSection() {
  const [isVisible, setIsVisible] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      // Auto-play the video once metadata is loaded
      video
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Auto-play failed:", error)
          // Auto-play failed, user interaction required
        })
    }

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100
      setProgress(currentProgress)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      // Auto-hide intro after video ends
      setTimeout(() => {
        setIsVisible(false)
      }, 1000)
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const skipIntro = () => {
    setIsVisible(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        playsInline
        autoPlay
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-08-01%20at%2012.19.57%20AM-UoGy9bBBnXLko2MXNBDIl0HubvF5BV.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Overlay */}
      <div className="relative z-10 text-white text-center max-w-4xl mx-auto px-4">
        
        
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        
        <Progress value={progress} className="h-1 bg-white/20" />
      </div>
    </div>
  )
}
