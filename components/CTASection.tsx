export default function CTASection() {
  return (
    <section className="min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-4xl mx-auto text-center space-y-8 w-full">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-instrument-serif font-normal tracking-tight leading-tight">
          <span className="italic">Your story is</span>
          <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            waiting to be told
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Start creating today. Join thousands of writers bringing their imagination to life with AI-powered storytelling.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 text-lg">
            Start Creating Free
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300 text-lg">
            Watch Demo
          </button>
        </div>

        {/* Trust badges */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Create 3 stories free</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
