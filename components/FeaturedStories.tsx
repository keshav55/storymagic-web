export default function FeaturedStories() {
  const stories = [
    {
      id: 1,
      title: "The Forgotten Archive",
      description: "An AI discovers hidden truths in ancient manuscripts",
      author: "By Sarah Chen",
      image: "bg-gradient-to-br from-purple-900 to-indigo-900",
      reads: "2.4K reads",
    },
    {
      id: 2,
      title: "Neon Dreams",
      description: "A cyberpunk love story set in a world of digital consciousness",
      author: "By Marcus Rivera",
      image: "bg-gradient-to-br from-pink-900 to-rose-900",
      reads: "1.8K reads",
    },
    {
      id: 3,
      title: "Whispers of Tomorrow",
      description: "Journey through parallel universes searching for home",
      author: "By Elena Petrov",
      image: "bg-gradient-to-br from-blue-900 to-cyan-900",
      reads: "3.1K reads",
    },
    {
      id: 4,
      title: "Echoes in the Void",
      description: "A haunting tale of connection across the infinite cosmos",
      author: "By James Wallace",
      image: "bg-gradient-to-br from-amber-900 to-orange-900",
      reads: "2.7K reads",
    },
  ];

  return (
    <section className="min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-instrument-serif font-normal tracking-tight">
            <span className="italic">Featured Stories</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore the most compelling narratives created with StoryMagic's AI assistance
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group cursor-pointer relative h-96 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 ${story.image} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{story.reads}</p>
                </div>

                {/* Bottom */}
                <div className="space-y-3">
                  <h3 className="text-xl font-instrument-serif font-normal italic group-hover:translate-x-1 transition-transform duration-300">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
                    {story.description}
                  </p>
                  <p className="text-xs text-gray-500">{story.author}</p>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 border border-white/20 rounded-lg font-instrument text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300">
            Explore All Stories
          </button>
        </div>
      </div>
    </section>
  );
}
