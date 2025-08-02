import Image from "next/image"
import { Users, Target, Award, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AboutIntro from "@/components/about-intro"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutIntro />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="w-fit mx-auto">
              About Us
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              We're building the future of
              <span className="text-blue-600"> web development</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our mission is to empower developers and designers with the tools they need to create exceptional digital
              experiences. We believe in the power of great design and seamless functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we build products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "Community First",
                description: "We believe in building together and supporting each other's growth.",
              },
              {
                icon: <Target className="w-8 h-8 text-green-600" />,
                title: "Quality Focus",
                description: "Every component is crafted with attention to detail and performance.",
              },
              {
                icon: <Award className="w-8 h-8 text-purple-600" />,
                title: "Innovation",
                description: "We constantly push boundaries to deliver cutting-edge solutions.",
              },
              {
                icon: <Heart className="w-8 h-8 text-red-600" />,
                title: "User-Centric",
                description: "Everything we build is designed with the end user in mind.",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind ComponentHub who make it all possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Alex Thompson",
                role: "CEO & Founder",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Former Google engineer with 10+ years in web development.",
              },
              {
                name: "Sarah Kim",
                role: "Head of Design",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Award-winning designer who previously worked at Apple and Airbnb.",
              },
              {
                name: "David Rodriguez",
                role: "Lead Developer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Full-stack expert specializing in React and modern web technologies.",
              },
            ].map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
