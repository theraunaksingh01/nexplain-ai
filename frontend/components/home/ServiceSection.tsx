// ServiceSection.tsx
export default function ServiceSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        {/* <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">Service</p> */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Omni-channel, any task,<br />multi-language
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Assistant offers a human-like service that effortlessly blends in your process, completing nearly any task
          and collaborating with your team within the Agent Platform.
        </p>
      </div>

      {/* Pinterest-style Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 - Collaborative Intelligence (Tall) - Spans 2 rows */}
        <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl p-6 lg:row-span-2">
          <img 
            src="/person-image.jpg" 
            alt="Person" 
            className="w-full h-40 object-cover rounded-2xl mb-4"
          />
          <div className="bg-blue-500 text-white text-xs px-3 py-2 rounded-lg inline-block mb-4">
            I looked for the quote where it<br />says that we should "Make it"
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Collaborative intelligence
          </h3>
          <p className="text-sm text-gray-700">
            Sub-agents work together seamlessly to handle complex scenarios, achieving superior results through coordination effort.
          </p>
        </div>

        {/* Card 2 - All major languages */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-900 font-medium">EN</span>
              <span className="text-gray-400">UK</span>
              <div className="ml-auto w-12 h-6 bg-gray-200 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-5 bg-red-500 rounded"></div>
              <span className="text-gray-900 font-medium">FR</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-2">Automatically detect</p>
          <h3 className="text-xl font-bold text-gray-900">
            All major languages
          </h3>
        </div>

        {/* Card 3 - Multitasking */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">Enrich contact details from non-text data</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-900 rounded-full mt-1.5 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">Identify new leads using LinkedIn or Apollo</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-2">Any team should try AI/human</p>
          <h3 className="text-xl font-bold text-gray-900">Multitasking</h3>
        </div>

        {/* Card 4 - 300K Daily Conversations */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">300K</h3>
          <p className="text-sm text-gray-600">Daily Conversations</p>
        </div>

        {/* Card 5 - Real-time Analytics (Wide card spanning 2 columns) */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-purple-600 mb-2 font-medium">Advanced Insights</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Analytics & Reporting</h3>
              <p className="text-sm text-gray-700 max-w-md">
                Track performance metrics, monitor conversation quality, and gain actionable insights with comprehensive analytics dashboard.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6 - Omni channel */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-xs text-gray-500 mb-2">Email / SMS / API</p>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Omni channel</h3>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}