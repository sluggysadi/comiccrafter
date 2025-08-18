import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Splash } from './pages/Splash';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';
import { Preview } from './pages/Preview';
import { Library } from './pages/Library';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:id" element={<Library />} />
      </Routes>
    </BrowserRouter>;
}