import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { DownloadIcon, ShareIcon, EditIcon, CropIcon } from 'lucide-react';
export const Preview = () => {
  const navigate = useNavigate();
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  // Sample data - in a real app this would come from the editor state
  const comicPanels = [{
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
  }];
  const ratioOptions = [{
    id: '1:1',
    label: '1:1 Square'
  }, {
    id: '4:5',
    label: '4:5 Portrait'
  }, {
    id: '16:9',
    label: '16:9 Landscape'
  }];
  const exportOptions = [{
    id: 'png',
    label: 'PNG'
  }, {
    id: 'jpg',
    label: 'JPG'
  }, {
    id: 'pdf',
    label: 'PDF'
  }];
  const getRatioClass = () => {
    switch (selectedRatio) {
      case '4:5':
        return 'aspect-[4/5]';
      case '16:9':
        return 'aspect-[16/9]';
      default:
        return 'aspect-square';
    }
  };
  const getLayoutClass = () => {
    const panelCount = comicPanels.length;
    if (panelCount <= 2) {
      return 'grid-cols-1';
    }
    if (panelCount <= 4) {
      return 'grid-cols-2';
    }
    return 'grid-cols-3';
  };
  return <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="pt-20 px-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Preview & Export</h1>
          <p className="text-gray-600">
            Your comic is ready to be exported and shared
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Preview canvas */}
          <div className="flex-grow">
            <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
              <div className={`${getRatioClass()} overflow-hidden bg-gray-100 rounded-xl mx-auto`}>
                <div className={`grid ${getLayoutClass()} gap-2 h-full`}>
                  {comicPanels.map((panel, index) => <div key={index} className="relative overflow-hidden">
                      <img src={panel.imageUrl} alt={`Panel ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                        <p className="text-xs text-white">{panel.caption}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="primary" icon={<DownloadIcon size={20} />}>
                Export Comic
              </Button>
              <Button variant="secondary" icon={<EditIcon size={20} />} onClick={() => navigate('/editor')}>
                Edit Again
              </Button>
            </div>
          </div>
          {/* Export options */}
          <div className="w-full md:w-72 bg-white rounded-2xl shadow-md p-4 h-fit">
            <h3 className="font-medium text-gray-800 mb-4">Export Options</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comic Title
              </label>
              <input type="text" placeholder="My Awesome Comic" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aspect Ratio
              </label>
              <div className="flex flex-wrap gap-2">
                {ratioOptions.map(option => <Chip key={option.id} label={option.label} selected={option.id === selectedRatio} onClick={() => setSelectedRatio(option.id)} icon={<CropIcon size={14} />} />)}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <div className="flex flex-wrap gap-2">
                {exportOptions.map(option => <Chip key={option.id} label={option.label} selected={option.id === 'png'} />)}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>High (2048px)</option>
                <option>Medium (1024px)</option>
                <option>Low (512px)</option>
              </select>
            </div>
            <div className="pt-2">
              <Button variant="secondary" fullWidth icon={<ShareIcon size={20} />}>
                Share Link
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>;
};