import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBackgroundClass = (condition: string, isDarkMode: boolean) => {
  const c = condition.toLowerCase();
  if (isDarkMode) {
    if (c.includes('clear')) return 'bg-gradient-to-br from-blue-600 to-blue-900';
    if (c.includes('cloud')) return 'bg-gradient-to-br from-slate-700 to-slate-900';
    if (c.includes('rain')) return 'bg-gradient-to-br from-blue-900 to-indigo-950';
    if (c.includes('thunderstorm')) return 'bg-gradient-to-br from-indigo-950 to-purple-950';
    return 'bg-gradient-to-br from-slate-800 to-slate-950';
  } else {
    if (c.includes('clear')) return 'bg-gradient-to-br from-blue-50 to-blue-200';
    if (c.includes('cloud')) return 'bg-gradient-to-br from-slate-50 to-slate-200';
    if (c.includes('rain')) return 'bg-gradient-to-br from-blue-100 to-indigo-200';
    if (c.includes('thunderstorm')) return 'bg-gradient-to-br from-indigo-100 to-purple-200';
    return 'bg-gradient-to-br from-slate-100 to-slate-300';
  }
};