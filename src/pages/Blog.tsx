
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSupport from '@/components/ContactSupport';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();
  
  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-roboto">
              Trading Insights Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-roboto">
              Expert analysis, AI-powered strategies, and practical tips to improve your trading performance.
            </p>
          </div>
          
          {/* Tags Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedTag === null
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-900/30 text-gray-300 hover:bg-purple-800/40'
              }`}
              onClick={() => setSelectedTag(null)}
            >
              All Posts
            </button>
            
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-900/30 text-gray-300 hover:bg-purple-800/40'
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="py-16 bg-[#120c22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link to={`/blog/${post.id}`} className="block h-full">
                  <div className="glass-card h-full flex flex-col overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-4">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-white font-roboto">{post.author.name}</p>
                          <p className="text-xs text-gray-400 font-roboto">{post.date} · {post.readingTime}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 text-white leading-tight font-roboto">{post.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 flex-grow font-roboto">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-purple-900/40 text-purple-300 rounded font-roboto">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ContactSupport />
      <Footer />
    </div>
  );
};

export default Blog;
