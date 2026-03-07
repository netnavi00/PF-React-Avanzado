import { Heart, Thermometer, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../lib/utils';


export default function WeatherCard({ weather, isDarkMode, favoriteCities, onToggleFavorite, getWeatherIcon }) {
  if (!weather) return null;

  return (
    <div className={cn(
      "lg:col-span-2 backdrop-blur-md border rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden",
      isDarkMode ? "bg-white/10 border-white/20" : "bg-white/40 border-black/5 shadow-xl"
    )}>
      {/* Contenido de la tarjeta */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-2">
            <button onClick={() => onToggleFavorite(weather.name)} className="p-2 rounded-xl transition-all mt-1">
              <Heart className={cn("w-6 h-6", favoriteCities.includes(weather.name) && "fill-current text-red-500")} />
            </button>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{weather.name}</h1>
              <p className={cn("text-lg font-medium", isDarkMode ? "text-white/70" : "text-slate-500")}>
                {format(new Date(), 'EEEE, d MMMM', { locale: es })}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          {getWeatherIcon(weather.weather[0].main)}
          <p className={cn("mt-2 font-medium capitalize text-sm", isDarkMode ? "text-white/70" : "text-slate-500"
          )}>
            {weather.weather[0].description}
        </p>
        </div>
      </div>

      <div className="mt-12 md:mt-24 relative z-10">
        <span className="text-8xl md:text-[10rem] font-bold tracking-tighter">{Math.round(weather.main.temp)}°C</span>
      </div>
    </div>
  );
}