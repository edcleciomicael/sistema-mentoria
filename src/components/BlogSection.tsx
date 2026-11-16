import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { blogPosts } from '../data/mockData';
import { BlogPost } from '../types';
import { ArrowRight, Share2, BookOpen, Clock, X, MessageCircle, Send } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { t, selectedArticle, setSelectedArticle } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Gestão de Processos', 'Finanças & Lucro', 'Liderança'];

  const filteredPosts =
    activeCategory === 'Todos'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const handleShare = (post: BlogPost, platform: 'whatsapp' | 'linkedin' | 'x') => {
    const url = window.location.href;
    const text = `${post.title} - Artigo Estratégico Marquez Adviser`;
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}: ${url}`)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return (
    <section id="blog" className="py-20 md:py-28 bg-slate-50/50 dark:bg-[#091122] border-b border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t.blog.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
              {t.blog.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {t.blog.desc}
            </p>
          </div>

          {/* Category Filter Tabs (Functional segmented controls) */}
          <div className="mt-6 md:mt-0 flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-blue-950 text-white dark:bg-blue-600 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div>
                {/* Clean Unboxed Metadata with · separator */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="font-semibold text-blue-900 dark:text-blue-400">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAt}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-display mb-3 [text-wrap:balance]">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div>
                {/* Actions & Sharing */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticle(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-400 hover:text-blue-950 dark:hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <span>{t.blog.readMore}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShare(post, 'whatsapp')}
                      title="Compartilhar no WhatsApp"
                      className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare(post, 'linkedin')}
                      title="Compartilhar no LinkedIn"
                      className="p-1.5 text-slate-400 hover:text-blue-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reading Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-blue-900 dark:text-blue-400">{selectedArticle.category}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-4">
                {selectedArticle.title}
              </h2>

              <div className="text-xs text-slate-500 mb-6 flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-[10px]">
                  MA
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    {selectedArticle.author.name}
                  </span>
                  <span>{selectedArticle.author.role}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Compartilhar este insight:</span>
                  <button
                    onClick={() => handleShare(selectedArticle, 'whatsapp')}
                    className="p-1.5 text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare(selectedArticle, 'linkedin')}
                    className="p-1.5 text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                  >
                    LinkedIn
                  </button>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="py-2 px-4 text-xs font-semibold text-white bg-blue-950 dark:bg-blue-600 rounded-lg cursor-pointer"
                >
                  Fechar Leitura
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
