import { Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function FavoriteCitiesList({ favoriteCities, city, onSelectCity, onToggleFavorite, isDarkMode }: any) {
  return (
    <div className="mt-12 w-full max-w-4xl">
      <div className="flex items-center gap-2 mb-4 px-4">
        <Heart className={cn("w-4 h-4", isDarkMode ? "text-white/50" : "text-slate-400")} />
        <h3 className={cn("font-bold uppercase tracking-widest text-xs", isDarkMode ? "text-white/50" : "text-slate-400")}>Mis Ciudades</h3>
      </div>
      
      <div className="flex flex-wrap gap-3 px-4">
        <AnimatePresence>
          {favoriteCities.map((cityName: string) => (
            <motion.div
              key={cityName}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative"
            >
              <button
                onClick={() => onSelectCity(cityName)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border pr-8",
                  city === cityName 
                    ? (isDarkMode ? "bg-white text-slate-900 border-white" : "bg-slate-900 text-white border-slate-900")
                    : (isDarkMode 
                        ? "bg-white/5 text-white/70 border-white/10 hover:bg-white/10" 
                        : "bg-black/5 text-slate-600 border-black/5 hover:bg-black/10")
                )}
              >
                {cityName}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(cityName); }}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                  city === cityName ? (isDarkMode ? "text-slate-900" : "text-white") : (isDarkMode ? "text-white/50" : "text-slate-400")
                )}
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}