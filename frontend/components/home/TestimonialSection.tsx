// TestimonialSection.tsx
export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Erich West",
      role: "CEO",
      text: "We connect with more remote through PitchBot, boosting our outreach.",
      position: "top-left"
    },
    {
      name: "Alison Ellis",
      role: "Marketing Manager",
      text: "My company was PitchBot to test with thousands of vendors every week. We've had mixed results working with teams located and part of our success.",
      position: "middle-left"
    },
    {
      name: "Declan Rodriguez",
      role: "Product Manager",
      text: "PitchBot has revolutionized how we handle customer inquiries.",
      position: "bottom-left"
    },
    {
      name: "Aaron Kim",
      role: "Sales Director",
      text: "As my family, we are PitchBot-ed to efficiently boost market strategy, I'm a weekly basis.",
      position: "top-right"
    },
    {
      name: "Natalie Jackson",
      role: "Operations Lead",
      text: "It's our thinking that create business, we utilize PitchBot to efficiently conduct proposals to customer outreach, leading to more deals.",
      position: "middle-right"
    },
    {
      name: "Unknown User",
      role: "Business Owner",
      text: "We use PitchBot to streamline our communications with our customers.",
      position: "bottom-right"
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What our users say
        </h2>
      </div>

      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 rounded-3xl p-8 md:p-16">
        <div className="relative min-h-[500px] flex items-center justify-center">
          
          {/* Central Circle with Pulsing Animation */}
          <div className="absolute">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 w-64 h-64 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
            
            {/* Main circle with heartbeat effect */}
            <div className="relative w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl flex items-center justify-center animate-pulse">
              <div className="w-56 h-56 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards - Positioned around circle */}
          <div className="absolute inset-0">
            {/* Top Left */}
            <div className="absolute top-8 left-8 max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Erich West</p>
                  <p className="text-xs text-gray-500">CEO</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                We connect with more remote through PitchBot, boosting our outreach.
              </p>
            </div>

            {/* Middle Left */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Alison Ellis</p>
                  <p className="text-xs text-gray-500">Marketing Manager</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                My company was PitchBot to test with thousands of vendors every week.
              </p>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-8 left-12 max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Declan Rodriguez</p>
                  <p className="text-xs text-gray-500">Product Manager</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                We use PitchBot to streamline communications and connect better.
              </p>
            </div>

            {/* Top Right */}
            <div className="absolute top-8 right-8 max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Aaron Kim</p>
                  <p className="text-xs text-gray-500">Sales Director</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                As my family, we are PitchBot-ed to efficiently boost market strategy.
              </p>
            </div>

            {/* Middle Right */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Natalie Jackson</p>
                  <p className="text-xs text-gray-500">Operations Lead</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                We utilize PitchBot to efficiently conduct proposals to customer outreach.
              </p>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-12 right-16 max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Sarah Mitchell</p>
                  <p className="text-xs text-gray-500">Business Owner</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                PitchBot has helped us connect with clients in record numbers of weeks.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}