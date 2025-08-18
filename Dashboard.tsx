import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ComicCard, TemplateCard } from '../components/Card';
import { Chip, FilterChips } from '../components/Chip';
import { SearchIcon, FilterIcon } from 'lucide-react';
export const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  // Sample data
  const recentComics = [{
    id: '1',
    title: 'Space Adventure',
    date: '2 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    panels: 4,
    style: 'Cartoon'
  }, {
    id: '2',
    title: 'Superhero Origin',
    date: '1 week ago',
    thumbnail: 'https://images.unsplash.com/photo-1612036782180-6f0822045d55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29taWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    panels: 3,
    style: 'Manga'
  }, {
    id: '3',
    title: 'Daily Life',
    date: '2 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29taWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    panels: 4,
    style: 'Newspaper'
  }];
  const templates = [{
    id: '1',
    title: 'Manga',
    thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFuZ2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }, {
    id: '2',
    title: 'Newspaper',
    thumbnail: 'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV3c3BhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }, {
    id: '3',
    title: 'Cartoon',
    thumbnail: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }];
  const styleFilters = [{
    id: 'all',
    label: 'All'
  }, {
    id: 'cartoon',
    label: 'Cartoon'
  }, {
    id: 'manga',
    label: 'Manga'
  }, {
    id: 'newspaper',
    label: 'Newspaper'
  }, {
    id: 'pop-art',
    label: 'Pop Art'
  }];
  const panelFilters = [{
    id: 'all',
    label: 'All Panels'
  }, {
    id: '3',
    label: '3 Panels'
  }, {
    id: '4',
    label: '4 Panels'
  }, {
    id: '6',
    label: '6 Panels'
  }];
  return <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="pt-20 px-4 max-w-6xl mx-auto">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
          </div>
          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search your comics..." className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Chip label="Style" icon={<FilterIcon size={16} />} />
              <Chip label="Panels" />
              <Chip label="Color" />
            </div>
          </div>
          {/* Templates */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Quick Templates
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {templates.map(template => <TemplateCard key={template.id} title={template.title} thumbnail={template.thumbnail} onClick={() => navigate('/editor', {
              state: {
                templateId: template.id
              }
            })} />)}
            </div>
          </div>
          {/* Recent comics */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Recent Comics
              </h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View all
              </button>
            </div>
            {/* Filter chips */}
            <div className="mb-4 overflow-x-auto pb-2">
              <FilterChips options={styleFilters} selectedId={selectedStyle || 'all'} onChange={setSelectedStyle} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentComics.map(comic => <ComicCard key={comic.id} title={comic.title} date={comic.date} thumbnail={comic.thumbnail} panels={comic.panels} style={comic.style} onClick={() => navigate(`/library/${comic.id}`)} />)}
            </div>
          </div>
        </section>
      </main>
    </div>;
};