
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSupport from '@/components/ContactSupport';
import { blogPosts } from '@/data/blogPosts';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.id === id);
  
  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
  if (!post) {
    return null;
  }
  
  // Find related posts based on tags
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center mb-8 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to all posts</span>
          </Link>
          
          {/* Post Header */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500/30"
              />
              <div>
                <h3 className="text-white font-medium">{post.author.name}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{post.date}</span>
                  <span className="mx-2">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm bg-purple-900/40 text-purple-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="rounded-2xl overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Post Content */}
      <section className="py-16 bg-[#120c22]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-playfair prose-p:font-montserrat prose-p:text-gray-300 prose-headings:text-white prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-pre:bg-gray-900 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-900/20 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-lg">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </div>
      </section>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-[#120c22] to-background border-t border-purple-900/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-8 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="block h-full">
                  <div className="glass-card h-full flex flex-col overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-3 text-white">{post.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 flex-grow">{post.excerpt}</p>
                      <div className="mt-auto">
                        <span className="text-purple-400 font-medium hover:text-purple-300">Read more →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <ContactSupport />
      <Footer />
    </div>
  );
};

export default BlogPost;
