import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, UserCircleIcon, PlusIcon } from 'lucide-react';
import { Button } from './Button';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="w-full bg-white shadow-md py-3 px-4 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              ComicCrafter
            </span>
          </div>
        </Link>
        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <Button variant="secondary" size="sm" onClick={() => {}} icon={<PlusIcon size={18} />}>
            New
          </Button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-100">
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/editor">
            <Button variant="primary" icon={<PlusIcon size={18} />}>
              New Comic
            </Button>
          </Link>
          <Link to="/library" className="text-gray-700 hover:text-indigo-600">
            My Library
          </Link>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <UserCircleIcon size={28} className="text-gray-700" />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 sm:hidden">
          <Link to="/editor" className="flex items-center gap-2 text-gray-800 py-2 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
            <PlusIcon size={18} />
            New Comic
          </Link>
          <Link to="/library" className="flex items-center gap-2 text-gray-800 py-2 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
            My Library
          </Link>
          <Link to="/profile" className="flex items-center gap-2 text-gray-800 py-2 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
            <UserCircleIcon size={18} />
            Profile
          </Link>
        </div>}
    </header>;
};