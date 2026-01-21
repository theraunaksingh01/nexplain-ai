export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

          {/* LEFT: TEXT CONTENT */}
          <div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Learn concepts clearly,
              <br />
              <span className="text-indigo-600">not through noise.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-gray-600 md:text-lg">
              Structured, visual, AI-assisted notes designed to help you
              understand core concepts without videos or distractions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition">
                Start Learning
              </button>

              <button className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                Browse Topics
              </button>
            </div>
          </div>

          {/* RIGHT: IMAGE / SVG */}
          <div className="relative flex justify-center md:justify-end">
            <div className="w-full max-w-sm rounded-2xl border bg-white p-4 shadow-lg">
              <img
                src="/hero-img.jpg"
                alt="Concept visualization"
                className="w-full rounded-xl"
              />
            </div>

            {/* Decorative blur */}
            <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
          </div>


        </div>
      </div>
    </section>
  );
}
