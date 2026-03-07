import React, { useState, useEffect, useCallback } from 'react';
import {Search, MapPin, Wind, Droplets, Thermometer, Sun, Cloud, CloudRain, 
  CloudLightning, CloudSnow, Navigation, RefreshCw, AlertCircle, Clock, Moon, 
  Sun as SunIcon, Heart, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { weatherService } from './services/weatherService';
import { WeatherData, ForecastData, MEXICAN_CITIES } from './types';
import { cn } from './lib/utils';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import ErrorMessage from './components/ErrorMessage';
import FavoriteCitiesList from './components/FavoriteCitiesList';

export default function App() {
  const [city, setCity] = useState('Mexico City');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorite_cities');
    return saved ? JSON.parse(saved) : MEXICAN_CITIES.slice(0, 6).map(c => c.name);
  });

  useEffect(() => {
    localStorage.setItem('favorite_cities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const toggleFavorite = (cityName: string) => {
    setFavoriteCities(prev => 
      prev.includes(cityName) 
        ? prev.filter(c => c !== cityName) 
        : [...prev, cityName]
    );
  };

  const fetchData = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherService.getCurrentWeather(cityName);
      const forecastData = await weatherService.getForecast(cityName);
      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
    } catch (err: any) {
      if (err.message.includes('API Key is missing')) {
        setError('MISSING_KEY');
      } else {
        setError('No se pudo encontrar el clima para esta ciudad. Intenta con otra o verifica tu conexión.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDataByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherService.getCurrentWeatherByCoords(lat, lon);
      const forecastData = await weatherService.getForecastByCoords(lat, lon);
      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
    } catch (err: any) {
      if (err.message.includes('API Key is missing')) {
        setError('MISSING_KEY');
      } else {
        setError('No se pudo obtener el clima de tu ubicación.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchData(searchQuery);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchDataByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError('Permiso de ubicación denegado.');
        }
      );
    }
  };

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('clear')) return <Sun className="w-12 h-12 text-yellow-400" />;
    if (c.includes('cloud')) return <Cloud className="w-12 h-12 text-gray-400" />;
    if (c.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-400" />;
    if (c.includes('thunderstorm')) return <CloudLightning className="w-12 h-12 text-purple-400" />;
    if (c.includes('snow')) return <CloudSnow className="w-12 h-12 text-white" />;
    return <Cloud className="w-12 h-12 text-gray-400" />;
  };

  const getBackgroundClass = (condition: string) => {
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

  const filteredCities = MEXICAN_CITIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
  <div className={cn(
    "min-h-screen transition-all duration-700 flex flex-col items-center p-4 md:p-8 font-sans",
    isDarkMode ? "text-white" : "text-slate-900",
    weather ? getBackgroundClass(weather.weather[0].main) : (isDarkMode ? 'bg-slate-900' : 'bg-slate-50')
  )}>
    
    {loading ? (
      /* Pantalla de carga completa: oculta absolutamente todo */
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-inherit">
        <RefreshCw className={cn("w-12 h-12 animate-spin", isDarkMode ? "text-white/50" : "text-slate-400")} />
        <p className={cn("text-xl font-medium", isDarkMode ? "text-white/50" : "text-slate-400")}>
          Cargando clima...
        </p>
      </div>
    ) : (
      /* Interfaz principal: solo se muestra cuando NO está cargando */
      <>
        <div className="w-full max-w-4xl flex justify-end mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={cn(
              "p-3 rounded-2xl backdrop-blur-md border transition-all",
              isDarkMode 
                ? "bg-white/10 border-white/20 hover:bg-white/20 text-white" 
                : "bg-white/40 border-black/10 hover:bg-white/60 text-slate-900 shadow-sm"
            )}
          >
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onLocation={getUserLocation}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          isDarkMode={isDarkMode}
          filteredCities={filteredCities}
          onSelectCity={(name) => {
            fetchData(name);
            setSearchQuery('');
            setShowSuggestions(false);
          }}
        />

        {error ? (
          <ErrorMessage 
            error={error} 
            onRetry={() => fetchData(city)} 
            isDarkMode={isDarkMode} 
          />
        ) : weather && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <WeatherCard 
              weather={weather}
              isDarkMode={isDarkMode}
              favoriteCities={favoriteCities}
              onToggleFavorite={toggleFavorite}
              getWeatherIcon={getWeatherIcon}
            />
            <ForecastList 
              weather={weather} 
              forecast={forecast} 
              isDarkMode={isDarkMode} 
            />
          </motion.div>
        )}

        {!error && (
          <FavoriteCitiesList 
            favoriteCities={favoriteCities}
            city={city}
            onSelectCity={fetchData}
            onToggleFavorite={toggleFavorite}
            isDarkMode={isDarkMode}
          />
        )}
      </>
    )}
  </div>
);
}
