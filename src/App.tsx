import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react'; // Solo motion, sin AnimatePresence si no la vas a usar
import { weatherService } from './services/weatherService';
import { WeatherData } from './types'; // Ya no necesitamos ForecastData ni MEXICAN_CITIES
import { cn, getBackgroundClass } from './lib/utils';
// Ya no necesitamos SearchBar, ForecastList, ErrorMessage, FavoriteCitiesList
import WeatherCard from './components/WeatherCard'; 

// Importa los iconos que usa getWeatherIcon directamente aquí si lo mantienes en App.tsx
import { Sun as SunIconLucide, Cloud, CloudRain, CloudLightning, CloudSnow } from 'lucide-react';


export default function App() {
  const [city] = useState('Mexico City'); // Ciudad fija, no se puede cambiar desde UI
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fetchData = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherService.getCurrentWeather(cityName);
      setWeather(weatherData);
    } catch (err: any) {
      setError('No se pudo cargar el clima para ' + cityName + '.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(city);
  }, [fetchData, city]); // Aseguramos que se cargue al inicio

  // Función getWeatherIcon si está en App.tsx. Si la mueves a utils.ts, borra esto.
  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('clear')) return <SunIconLucide className="w-12 h-12 text-yellow-400" />;
    if (c.includes('cloud')) return <Cloud className="w-12 h-12 text-gray-400" />;
    if (c.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-400" />;
    if (c.includes('thunderstorm')) return <CloudLightning className="w-12 h-12 text-purple-400" />;
    if (c.includes('snow')) return <CloudSnow className="w-12 h-12 text-white" />;
    return <Cloud className="w-12 h-12 text-gray-400" />;
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-700 flex flex-col items-center justify-center p-4 font-sans",
      isDarkMode ? "text-white" : "text-slate-900",
      weather ? getBackgroundClass(weather.weather[0].main, isDarkMode) : (isDarkMode ? 'bg-slate-900' : 'bg-slate-50')
    )}>
      
      <div className="fixed top-4 right-4 z-10"> {/* Botón de Dark Mode fijo */}
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-black/20 backdrop-blur-md">
          {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-slate-900" />}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-12 h-12 animate-spin text-white/50" />
          <p className="text-xl font-medium text-white/50">Cargando clima...</p>
        </div>
      ) : error ? (
        <div className="text-center p-6 rounded-2xl bg-red-500/20 text-red-300 border border-red-500 max-w-sm">
          <p className="text-lg font-semibold">{error}</p>
          <button onClick={() => fetchData(city)} className="mt-4 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition">Reintentar</button>
        </div>
      ) : weather && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <WeatherCard 
            weather={weather}
            isDarkMode={isDarkMode}
            getWeatherIcon={getWeatherIcon} // Pasa la función de icono
            // Ya no necesitas favoriteCities ni onToggleFavorite si no hay favoritos
          />
        </motion.div>
      )}
    </div>
  );
}