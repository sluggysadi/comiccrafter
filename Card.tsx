import React from 'react';
type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
};
export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = true
}: CardProps) => {
  const hoverStyles = hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  return <div className={`bg-white rounded-2xl shadow-md p-4 transition-all duration-300 ${hoverStyles} ${className}`} onClick={onClick}>
      {children}
    </div>;
};
export const ComicCard = ({
  title,
  date,
  thumbnail,
  panels,
  style,
  onClick
}: {
  title: string;
  date: string;
  thumbnail: string;
  panels: number;
  style: string;
  onClick: () => void;
}) => {
  return <Card onClick={onClick} className="flex flex-col h-full">
      <div className="w-full h-40 rounded-xl bg-gray-200 overflow-hidden mb-3" style={{
      backgroundImage: `url(${thumbnail})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
            {panels} panels
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
            {style}
          </span>
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </Card>;
};
export const TemplateCard = ({
  title,
  thumbnail,
  onClick
}: {
  title: string;
  thumbnail: string;
  onClick: () => void;
}) => {
  return <Card onClick={onClick} className="flex flex-col items-center">
      <div className="w-full h-32 rounded-xl bg-gray-200 overflow-hidden mb-3" style={{
      backgroundImage: `url(${thumbnail})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
      <h3 className="font-medium text-center text-gray-800">{title}</h3>
    </Card>;
};