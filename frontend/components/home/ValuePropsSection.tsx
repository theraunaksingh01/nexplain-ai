export default function ProgramsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 to-purple-950 px-8 py-12 md:px-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          
          {/* Left side - Header */}
          <div className="text-white md:max-w-xs flex-shrink-0">
            <h2 className="mb-3 text-4xl font-bold md:text-5xl">Programs</h2>
            <p className="text-gray-300 text-base md:text-lg">
              Our programs are designed to develop your children.
            </p>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px bg-white/20 self-stretch" />

          {/* Right side - Program cards in one row */}
          <div className="flex-1 flex flex-wrap md:flex-nowrap gap-4 md:gap-6">
            
            {/* Creative Thinking Card */}
            <div className="flex-1 min-w-[180px] flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="mb-3 text-4xl">☀️</div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Creative Thinking
              </h3>
              <button className="mt-auto text-sm text-white/80 hover:text-white flex items-center gap-1">
                Learn more <span className="text-lg">+</span>
              </button>
            </div>

            {/* Career Planning Card - Featured */}
            <div className="flex-1 min-w-[180px] flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg transform hover:scale-105 transition-transform">
              <div className="mb-3 text-4xl">💼</div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Career Planning
              </h3>
              <button className="mt-auto text-sm text-white/90 hover:text-white flex items-center gap-1">
                Learn more <span className="text-lg">+</span>
              </button>
            </div>

            {/* Public Speaking Card */}
            <div className="flex-1 min-w-[180px] flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="mb-3 text-4xl">📢</div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Public Speaking
              </h3>
              <button className="mt-auto text-sm text-white/80 hover:text-white flex items-center gap-1">
                Learn more <span className="text-lg">+</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}