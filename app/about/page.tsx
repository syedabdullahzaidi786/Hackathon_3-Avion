import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-light mb-6">About Avion</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A new era in eco-friendly furniture with Avion, the French luxury retail brand with nice fonts, tasteful
          colors, and a beautiful way to display things digitally.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-[4/3]">
          <Image src="/team.jpg" alt="Our mission" fill className="object-cover rounded-lg" />
        </div>
        <div>
          <h2 className="text-3xl font-light mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            When we started Avion, the idea was simple. Make high-quality furniture affordable and available for the
            mass market.
          </p>
          <p className="text-gray-600 mb-6">
            We believe that everyone deserves to have access to well-designed, durable furniture that doesn't break the
            bank. Our commitment to sustainability means we source eco-friendly materials and work with artisans who
            share our values.
          </p>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Crafted with Love</h3>
          <p className="text-gray-600">
            Each piece is handmade by skilled artisans who pour their heart into every detail.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Sustainable Materials</h3>
          <p className="text-gray-600">We source eco-friendly materials to ensure our footprint remains minimal.</p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Quality Guaranteed</h3>
          <p className="text-gray-600">Every piece undergoes rigorous quality control to meet our high standards.</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {[
            { id: 1, name: "Syed Abdullah", image: "/abdullah.jpg", position: "Founder & CEO" },
            { id: 2, name: "Rajab Raza", image: "/rajab.png", position: "Director & Co-Founder" },
          ].map((member) => (
            <div key={member.id} className="space-y-4">
              <div className="relative aspect-square">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={`${member.name} - ${member.position}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-light mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Have questions about our products, or interested in collaboration? We'd love to hear from you.
        </p>
        <Button>Contact Us</Button>
      </div>
    </div>
  )
}

