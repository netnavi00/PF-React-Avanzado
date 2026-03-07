import { Search, Navigation, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function SearchBar({ 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  onLocation, 
  showSuggestions, 
  setShowSuggestions, 
  isDarkMode, 
  filteredCities, 
  onSelectCity 
}) {
  return (
    <div className="w-full max-w-md mb-8 relative">
      <form onSubmit={onSearch} className="relative group">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Buscar ciudad en México..."
          className={cn(
            "w-full backdrop-blur-md border rounded-2xl py-4 px-12 outline-none transition-all",
            isDarkMode 
              ? "bg-white/10 border-white/20 focus:ring-white/30 placeholder:text-white/50" 
              : "bg-white/40 border-black/10 focus:ring-black/10 placeholder:text-slate-400 shadow-sm"
          )}
        />
        <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", isDarkMode ? "text-white/50" : "text-slate-400")} />
        <button type="button" onClick={onLocation} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg">
          <Navigation className="w-5 h-5 text-slate-400" />
        </button>
      </form>

      {/* Sugerencias */}
      <AnimatePresence>
        {showSuggestions && searchQuery && (
          <motion.div className={cn("absolute top-full left-0 right-0 mt-2 backdrop-blur-xl border rounded-2xl overflow-hidden z-50", isDarkMode ? "bg-slate-800/80" : "bg-white/80")}>
            {filteredCities.map((c) => (
              <button key={c.name} onClick={() => onSelectCity(c.name)} className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{c.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}