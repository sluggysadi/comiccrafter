import React, { useState } from 'react';
import { EditIcon, TrashIcon, MessageCircleIcon } from 'lucide-react';
type ComicPanelProps = {
  imageUrl?: string;
  caption?: string;
  onCaptionChange?: (caption: string) => void;
  onDelete?: () => void;
  onEdit?: () => void;
  selected?: boolean;
  index: number;
};
export const ComicPanel = ({
  imageUrl,
  caption = '',
  onCaptionChange,
  onDelete,
  onEdit,
  selected = false,
  index
}: ComicPanelProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const borderStyle = selected ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-gray-300';
  return <div className={`relative bg-white rounded-xl border-2 border-dashed ${borderStyle} aspect-square overflow-hidden transition-all duration-300 ${selected ? 'shadow-md' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {imageUrl ? <div className="w-full h-full relative">
          <img src={imageUrl} alt={`Comic panel ${index + 1}`} className="w-full h-full object-cover" />
          {showSpeechBubble && <div className="absolute top-4 left-4 right-4 bg-white rounded-xl p-3 shadow-md">
              <p className="text-sm">Speech bubble text here</p>
            </div>}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
            <input type="text" value={caption} onChange={e => onCaptionChange?.(e.target.value)} placeholder="Add caption..." className="w-full bg-transparent text-white text-sm border-none focus:outline-none placeholder-gray-300" />
          </div>
        </div> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-center p-4">
          <p>Panel {index + 1}</p>
        </div>}
      {(isHovered || selected) && <div className="absolute top-2 right-2 flex gap-1">
          <button onClick={() => setShowSpeechBubble(!showSpeechBubble)} className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
            <MessageCircleIcon size={16} className="text-gray-700" />
          </button>
          <button onClick={onEdit} className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
            <EditIcon size={16} className="text-gray-700" />
          </button>
          <button onClick={onDelete} className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
            <TrashIcon size={16} className="text-red-500" />
          </button>
        </div>}
    </div>;
};