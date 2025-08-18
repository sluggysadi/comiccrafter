import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRightIcon, PlayIcon } from 'lucide-react';
export const Splash = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="mb-6 inline-block">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl md:text-4xl font-bold mx-auto">
              C
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ComicCrafter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Turn your ideas into comics.
          </p>
          {/* Comic panel illustration */}
          <div className="mb-12 relative">
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              {[1, 2, 3, 4].map(panel => <div key={panel} className="aspect-square rounded-xl shadow-md overflow-hidden border-2 border-white" style={{
              backgroundColor: ['#FCD34D', '#60A5FA', '#F87171', '#34D399'][panel - 1]
            }} />)}
            </div>
            {/* Speech bubble decorations */}
            <div className="absolute -top-6 -right-4 bg-white rounded-xl shadow-md p-3 transform rotate-6">
              <p className="text-sm font-medium">Wow!</p>
            </div>
            <div className="absolute -bottom-5 -left-2 bg-white rounded-xl shadow-md p-3 transform -rotate-3">
              <p className="text-sm font-medium">So cool!</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" fullWidth icon={<ArrowRightIcon size={20} />} iconPosition="right" onClick={() => navigate('/dashboard')}>
              Get Started
            </Button>
            <Button variant="secondary" size="lg" fullWidth icon={<PlayIcon size={20} />} onClick={() => navigate('/editor')}>
              Try Demo
            </Button>
          </div>
        </div>
      </div>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2023 ComicCrafter • Made with creativity</p>
      </footer>
    </div>;
};