import React from 'react';
type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
};
export const Chip = ({
  label,
  selected = false,
  onClick,
  icon
}: ChipProps) => {
  const selectedStyles = selected ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
  return <button className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 transform ${selectedStyles} ${selected ? 'scale-105' : ''}`} onClick={onClick}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
    </button>;
};
type FilterChipsProps = {
  options: {
    id: string;
    label: string;
  }[];
  selectedId: string | null;
  onChange: (id: string) => void;
};
export const FilterChips = ({
  options,
  selectedId,
  onChange
}: FilterChipsProps) => {
  return <div className="flex flex-wrap gap-2">
      {options.map(option => <Chip key={option.id} label={option.label} selected={option.id === selectedId} onClick={() => onChange(option.id)} />)}
    </div>;
};