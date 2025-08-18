import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { ComicPanel } from '../components/ComicPanel';
import { UndoIcon, RedoIcon, PaletteIcon, LayoutIcon, DownloadIcon, SparklesIcon } from 'lucide-react';
export const Editor = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedPanels, setSelectedPanels] = useState<string>('4');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPanels, setGeneratedPanels] = useState<Array<{
    imageUrl?: string;
    caption: string;
  }>>([]);
  const toneOptions = [{
    id: 'wholesome',
    label: 'Wholesome'
  }, {
    id: 'snarky',
    label: 'Snarky'
  }, {
    id: 'heroic',
    label: 'Heroic'
  }];
  const panelOptions = [{
    id: '3',
    label: '3 Panels'
  }, {
    id: '4',
    label: '4 Panels'
  }, {
    id: '6',
    label: '6 Panels'
  }];
  const styleOptions = [{
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
  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      // Create empty panels based on selection
      const panels = parseInt(selectedPanels);
      const dummyPanels = Array(panels).fill(null).map((_, i) => ({
        imageUrl: i % 2 === 0 ? 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' : 'https://images.unsplash.com/photo-1612036782180-6f0822045d55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29taWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        caption: `Panel ${i + 1} caption`
      }));
      setGeneratedPanels(dummyPanels);
      setIsGenerating(false);
    }, 1500);
  };
  const handleUpdateCaption = (index: number, caption: string) => {
    const updatedPanels = [...generatedPanels];
    updatedPanels[index] = {
      ...updatedPanels[index],
      caption
    };
    setGeneratedPanels(updatedPanels);
  };
  const handleDeletePanel = (index: number) => {
    const updatedPanels = [...generatedPanels];
    updatedPanels.splice(index, 1);
    setGeneratedPanels(updatedPanels);
    setSelectedPanel(null);
  };
  return <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="pt-20 px-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Comic</h1>
          <p className="text-gray-600">Turn your ideas into a visual story</p>
        </div>
        {/* Prompt card */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Describe your scene
            </label>
            <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="A superhero discovers they have the power to talk to plants..." className="w-full min-h-[100px] p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {toneOptions.map(option => <Chip key={option.id} label={option.label} selected={option.id === selectedTone} onClick={() => setSelectedTone(option.id)} />)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panels
              </label>
              <div className="flex flex-wrap gap-2">
                {panelOptions.map(option => <Chip key={option.id} label={option.label} selected={option.id === selectedPanels} onClick={() => setSelectedPanels(option.id)} />)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map(option => <Chip key={option.id} label={option.label} selected={option.id === selectedStyle} onClick={() => setSelectedStyle(option.id)} />)}
              </div>
            </div>
          </div>
          <Button variant="primary" fullWidth icon={<SparklesIcon size={20} />} onClick={handleGenerate} disabled={isGenerating || !prompt}>
            {isGenerating ? 'Generating...' : 'Generate Comic'}
          </Button>
        </div>
        {/* Storyboard grid */}
        {generatedPanels.length > 0 && <>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Comic Storyboard
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {generatedPanels.map((panel, index) => <ComicPanel key={index} imageUrl={panel.imageUrl} caption={panel.caption} onCaptionChange={caption => handleUpdateCaption(index, caption)} onDelete={() => handleDeletePanel(index)} onEdit={() => setSelectedPanel(index)} selected={selectedPanel === index} index={index} />)}
              </div>
            </div>
            {/* Preview button */}
            <div className="flex justify-center">
              <Button variant="primary" onClick={() => navigate('/preview')} icon={<DownloadIcon size={20} />}>
                Preview & Export
              </Button>
            </div>
          </>}
      </main>
      {/* Toolbar (bottom sticky on mobile) */}
      {generatedPanels.length > 0 && <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 px-4 py-3 md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <UndoIcon size={22} />
              </button>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <RedoIcon size={22} />
              </button>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <PaletteIcon size={22} />
              </button>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <LayoutIcon size={22} />
              </button>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-1" onClick={() => navigate('/preview')}>
              <DownloadIcon size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>}
      {/* Right drawer (desktop) */}
      {selectedPanel !== null && generatedPanels.length > 0 && <div className="hidden md:block fixed top-20 right-0 bottom-0 w-72 bg-white shadow-lg border-l border-gray-200 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">
              Panel {selectedPanel + 1} Properties
            </h3>
            <button className="text-gray-400 hover:text-gray-600" onClick={() => setSelectedPanel(null)}>
              ×
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Character Pose
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Standing</option>
                <option>Sitting</option>
                <option>Action</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expression
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Happy</option>
                <option>Sad</option>
                <option>Surprised</option>
                <option>Angry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>City</option>
                <option>Nature</option>
                <option>Indoor</option>
                <option>Abstract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speech Bubble Style
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Classic</option>
                <option>Thought</option>
                <option>Exclamation</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Intensity
              </label>
              <div className="flex items-center gap-2">
                <div size={16} className="text-gray-400" />
                <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
                <div size={16} className="text-gray-700" />
              </div>
            </div>
          </div>
        </div>}
    </div>;
};