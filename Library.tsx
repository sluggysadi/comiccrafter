import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { EditIcon, TrashIcon, DownloadIcon, CopyIcon, GridIcon, ListIcon, SearchIcon, FilterIcon, CalendarIcon } from 'lucide-react';
export const Library = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Sample data
  const comics = [{
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
  }, {
    id: '4',
    title: 'Fantasy Quest',
    date: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFuZ2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    panels: 6,
    style: 'Pop Art'
  }];
  // If we're viewing a specific comic
  const selectedComic = id ? comics.find(comic => comic.id === id) : null;
  // Panels for the selected comic
  const comicPanels = selectedComic ? [{
    imageUrl: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    caption: 'Our hero discovers a strange plant'
  }, {
    imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0822045d55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29taWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    caption: 'The plant begins to speak!'
  }, {
    imageUrl: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29taWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    caption: 'They form an unlikely friendship'
  }, {
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFuZ2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    caption: 'Together they save the day'
  }] : [];
  // If viewing a specific comic
  if (selectedComic) {
    return <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        <main className="pt-20 px-4 max-w-6xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <button onClick={() => navigate('/library')} className="text-indigo-600 font-medium flex items-center gap-1 mb-2">
                ← Back to Library
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedComic.title}
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={<EditIcon size={18} />} onClick={() => navigate('/editor')}>
                Edit
              </Button>
              <Button variant="secondary" size="sm" icon={<CopyIcon size={18} />}>
                Duplicate
              </Button>
              <Button variant="tertiary" size="sm" icon={<TrashIcon size={18} />} className="text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              {/* Comic preview */}
              <Card className="mb-6 p-0 overflow-hidden">
                <div className="aspect-[16/9] bg-gray-900 relative">
                  <div className="grid grid-cols-2 gap-1 h-full">
                    {comicPanels.map((panel, index) => <div key={index} className="relative overflow-hidden">
                        <img src={panel.imageUrl} alt={`Panel ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                          <p className="text-xs text-white">{panel.caption}</p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </Card>
              {/* Comments section */}
              <Card>
                <h3 className="font-medium text-gray-800 mb-4">Notes</h3>
                <textarea placeholder="Add notes about your comic..." className="w-full min-h-[100px] p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                <Button variant="primary" className="mt-3">
                  Save Notes
                </Button>
              </Card>
            </div>
            <div className="w-full md:w-1/3">
              {/* Comic details */}
              <Card className="mb-6">
                <h3 className="font-medium text-gray-800 mb-4">
                  Comic Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="flex items-center gap-1">
                      <CalendarIcon size={16} className="text-gray-400" />
                      {selectedComic.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Style</p>
                    <p className="flex items-center gap-2 mt-1">
                      <Chip label={selectedComic.style} />
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Panels</p>
                    <p>{selectedComic.panels} panels</p>
                  </div>
                </div>
              </Card>
              {/* Export options */}
              <Card>
                <h3 className="font-medium text-gray-800 mb-4">Export</h3>
                <Button variant="primary" fullWidth icon={<DownloadIcon size={20} />} onClick={() => navigate('/preview')}>
                  Download Comic
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>;
  }
  // Library view (all comics)
  return <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="pt-20 px-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Library</h1>
          <p className="text-gray-600">
            Manage and organize your comic creations
          </p>
        </div>
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search comics..." className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
          </div>
          <div className="flex items-center gap-3">
            <Chip label="Filter" icon={<FilterIcon size={16} />} />
            <div className="border-l border-gray-300 h-6"></div>
            <button className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`} onClick={() => setViewMode('grid')}>
              <GridIcon size={20} className="text-gray-700" />
            </button>
            <button className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`} onClick={() => setViewMode('list')}>
              <ListIcon size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
        {/* Comics grid */}
        {viewMode === 'grid' ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {comics.map(comic => <Card key={comic.id} onClick={() => navigate(`/library/${comic.id}`)}>
                <div className="w-full h-40 rounded-xl bg-gray-200 overflow-hidden mb-3" style={{
            backgroundImage: `url(${comic.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
                <h3 className="font-bold text-gray-800 mb-1">{comic.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      {comic.panels} panels
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      {comic.style}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{comic.date}</span>
                </div>
              </Card>)}
          </div> : <div className="space-y-3">
            {comics.map(comic => <Card key={comic.id} onClick={() => navigate(`/library/${comic.id}`)} className="flex gap-4 p-3">
                <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden" style={{
            backgroundImage: `url(${comic.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{comic.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      {comic.panels} panels
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      {comic.style}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex-shrink-0">
                  {comic.date}
                </div>
              </Card>)}
          </div>}
      </main>
    </div>;
};