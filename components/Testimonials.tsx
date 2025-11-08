export default function Testimonials() {
  const testimonials = [
    {
      quote: "I never thought I could write a novel. StoryMagic made it possible. The AI suggestions kept me going when I got stuck.",
      author: "Maya Patel",
      role: "Novelist, 45K followers",
      initials: "MP",
    },
    {
      quote: "The best creative partner I've ever had. It understands my voice and helps me push my stories further than I could alone.",
      author: "James Chen",
      role: "Science Fiction Author",
      initials: "JC",
    },
    {
      quote: "My 12-year-old uses this to write fantasy stories. Watching her create and share has been magical.",
      author: "Sarah Williams",
      role: "Parent, 28K followers",
      initials: "SW",
    },
    {
      quote: "From first draft to published story in weeks. This is the future of creative writing.",
      author: "Alex Rodriguez",
      role: "Literary Blogger",
      initials: "AR",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-black/80 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-instrument-serif font-normal tracking-tight">
            <span className="italic">Stories from Our Community</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how creators worldwide are using StoryMagic to bring their imagination to life
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg p-8 hover:border-white/20 transition-all duration-300"
            >
              {/* Quote */}
              <blockquote className="mb-6">
                <p className="text-lg text-white leading-relaxed italic">"{testimonial.quote}"</p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-24 border-t border-white/10">
          <div className="text-center">
            <div className="text-4xl font-instrument-serif italic mb-2">50K+</div>
            <p className="text-gray-400">Stories Created</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-instrument-serif italic mb-2">125K+</div>
            <p className="text-gray-400">Active Writers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-instrument-serif italic mb-2">10M+</div>
            <p className="text-gray-400">Story Reads</p>
          </div>
        </div>
      </div>
    </section>
  );
}
