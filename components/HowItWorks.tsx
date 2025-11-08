export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Spark an Idea",
      description: "Tell the AI your story concept, setting, characters, or any creative spark. No idea is too vague.",
      icon: "✨",
    },
    {
      number: "02",
      title: "Co-Create Together",
      description: "Chat with AI to develop plot, dialogue, and narrative structure. Get suggestions, refine details.",
      icon: "🎨",
    },
    {
      number: "03",
      title: "Polish & Refine",
      description: "Iterate on your story with AI feedback. Adjust tone, pacing, and character arcs until it feels right.",
      icon: "✍️",
    },
    {
      number: "04",
      title: "Share Your Story",
      description: "Publish to the StoryMagic community. Get discovered, inspire others, build your audience.",
      icon: "🌟",
    },
  ];

  return (
    <section className="min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-instrument-serif font-normal tracking-tight">
            <span className="italic">How It Works</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Four simple steps to turn your imagination into a published story
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Number background */}
              <div className="absolute -left-8 -top-4 text-6xl font-instrument-serif opacity-10 select-none">
                {step.number}
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-4 pl-0 md:pl-8">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{step.icon}</span>
                  <div>
                    <h3 className="text-2xl font-instrument-serif italic mb-2">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Divider (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-6 top-20 w-0.5 h-32 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/10">
          <div className="space-y-3">
            <h3 className="text-white font-instrument-serif italic text-lg">AI-Powered Co-Writing</h3>
            <p className="text-gray-400 text-sm">
              Work alongside advanced AI models trained on thousands of stories. Get suggestions, inspiration, and real-time feedback.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-white font-instrument-serif italic text-lg">Community Discovery</h3>
            <p className="text-gray-400 text-sm">
              Discover stories from creators worldwide. Get inspired by different genres, styles, and storytelling approaches.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-white font-instrument-serif italic text-lg">Creative Freedom</h3>
            <p className="text-gray-400 text-sm">
              No limits on length, genre, or style. From flash fiction to epic novels, StoryMagic adapts to your vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
