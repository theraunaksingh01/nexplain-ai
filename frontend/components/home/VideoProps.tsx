export default function AIVideoHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left side - Content */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Experience Next-Gen AI Video Generation
            </h1>
            
            <div className="space-y-3 mb-8">
              <p className="text-lg text-gray-600">
                Powered by Ray2 API
              </p>
              
            </div>
            
          </div>

          {/* Right side - Video */}
          <div className="relative bg-gray-900 min-h-[400px] md:min-h-full flex items-center justify-center">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/your-video.mp4" type="video/mp4" />
              {/* Fallback placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Video 
              </div>
            </video>
          </div>

        </div>
      </div>
    </section>
  );
}