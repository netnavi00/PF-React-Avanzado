import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Moon, Sun as SunIcon, Cloud, CloudRain, CloudLightning, CloudSnow, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { weatherService } from './services/weatherService';
import { WeatherData, MEXICAN_CITIES } from './types';
import { cn } from './lib/utils';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import FavoriteCitiesList from './components/FavoriteCitiesList';

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Estados requeridos por tu SearchBar existente
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 1. Corrección: Inicialización segura para evitar el error de JSON.parse
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('favorite_cities');
      if (!saved || saved === "undefined") return MEXICAN_CITIES.slice(0, 3).map(c => c.name);
      return JSON.parse(saved);
    } catch (e) {
      return MEXICAN_CITIES.slice(0, 3).map(c => c.name);
    }
  });

  const fetchData = useCallback(async (cityName: string) => {
    setLoading(true);
    try {
      const data = await weatherService.getCurrentWeather(cityName);
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchData(searchQuery);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const filteredCities = MEXICAN_CITIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('clear')) return <Sun className="w-12 h-12 text-yellow-400" />;
    if (c.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-400" />;
    if (c.includes('thunderstorm')) return <CloudLightning className="w-12 h-12 text-purple-400" />;
    if (c.includes('snow')) return <CloudSnow className="w-12 h-12 text-white" />;
    return <Cloud className="w-12 h-12 text-gray-400" />;
  };

  useEffect(() => { fetchData('Mexico City'); }, [fetchData]);

  return (
    <div className={cn(
      "min-h-screen transition-all duration-700 flex flex-col items-center p-4 md:p-8",
      isDarkMode ? "text-white bg-slate-900" : "text-slate-900 bg-slate-50"
    )}>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="self-end p-2 rounded-xl bg-white/10 mb-4">
        {isDarkMode ? <SunIcon className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {loading ? (
        <RefreshCw className="w-12 h-12 animate-spin mt-20" />
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6 items-center">
          {/* Aquí inyectamos todas las props que tu SearchBar necesita */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            onLocation={() => alert("Ubicación no implementada")}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            isDarkMode={isDarkMode}
            filteredCities={filteredCities}
            onSelectCity={(name) => { fetchData(name); setSearchQuery(''); }}
          />
          
          {weather && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <div className="lg:col-span-2">
                <WeatherCard 
                  weather={weather} 
                  isDarkMode={isDarkMode} 
                  onToggleFavorite={(name: string) => {
                    setFavoriteCities(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
                  }}
                  getWeatherIcon={getWeatherIcon} 
                />
              </div>
              <FavoriteCitiesList 
                favoriteCities={favoriteCities} 
                city={weather.name} 
                onSelectCity={fetchData} 
                onToggleFavorite={() => {}} 
                isDarkMode={isDarkMode} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}