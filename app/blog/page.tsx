// app/blog/page.tsx
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import pool from '@/lib/db'; // Your MySQL connection

// Types
type BlogPost = {
  slug: string;
  title: string;
  short_desc: string;
  author: string | null;
  created_at: string;
  read_time: string | null;
  category: string | null;
  image_url: string | null;
};

type Category = {
  category: string;
};

// Fetch blog page data
async function getBlogPageData(selectedCategory?: string) {
  try {
    // Featured post
    const [featuredRows]: any[] = await pool.query(
      `SELECT slug, title, short_desc, author, created_at, read_time, category, image_url
       FROM blogs
       ORDER BY created_at DESC
       LIMIT 1`
    );
    const featuredPost: BlogPost | null = featuredRows.length > 0 ? featuredRows[0] : null;

    // Other posts
    let postsQuery = `
      SELECT slug, title, short_desc, author, created_at, read_time, category, image_url
      FROM blogs
      WHERE slug != ?
    `;
    const queryParams: (string | undefined)[] = [featuredPost?.slug];

    if (selectedCategory && selectedCategory !== 'All') {
      postsQuery += ' AND category = ?';
      queryParams.push(selectedCategory);
    }
    postsQuery += ' ORDER BY created_at DESC';

    const [blogPostRows]: any[] = await pool.query(postsQuery, queryParams);
    const blogPosts: BlogPost[] = blogPostRows;

    // Categories
    const [categoryRows]: any[] = await pool.query(
      `SELECT DISTINCT category FROM blogs WHERE category IS NOT NULL AND category != '' ORDER BY category ASC`
    );
    const categories: Category[] = [{ category: 'All' }, ...categoryRows];

    return { featuredPost, blogPosts, categories };
  } catch (error) {
    console.error('Database Error:', error);
    return { featuredPost: null, blogPosts: [], categories: [] };
  }
}

// Blog page
export default async function Blog({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = await searchParams?.category ?? 'All';
  const { featuredPost, blogPosts, categories } = await getBlogPageData(selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Technology Blog</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Insights, tutorials, and industry updates from our team of technology experts
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {featuredPost.category && (
                    <div className="inline-block self-start px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-full mb-4">
                      {featuredPost.category}
                    </div>
                  )}
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.short_desc}
                  </p>
                  <div className="flex items-center justify-between text-gray-600 mb-6">
                    <span>By <strong>{featuredPost.author || 'Teresol Team'}</strong></span>
                    <span>{featuredPost.read_time}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="self-start bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all"
                  >
                    Read Full Article
                  </Link>
                </div>
                <div className="h-64 lg:h-auto overflow-hidden relative bg-gray-200">
                  {featuredPost.image_url ? (
                    <Image
                      src={featuredPost.image_url}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">Featured Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.category === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat.category)}`}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === cat.category ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-blue-100'
                }`}
              >
                {cat.category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">
              Stay informed with the latest trends and insights in technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                href={`/blog/${post.slug}`}
                key={index}
                className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">Blog Post</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {post.category && (
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-3">
                      {post.category}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {post.short_desc}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <span>{post.author || 'Teresol Team'}</span>
                    <span>{post.read_time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
