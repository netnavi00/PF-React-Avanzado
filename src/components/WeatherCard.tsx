import { Heart, Thermometer, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';


export default function WeatherCard({ weather, isDarkMode, favoriteCities, onToggleFavorite, getWeatherIcon, unit, convertTemp }) {
  if (!weather) return null;

  return (
    <div className={cn(
      "lg:col-span-2 backdrop-blur-md border rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden",
      isDarkMode ? "bg-white/10 border-white/20" : "bg-white/40 border-black/5 shadow-xl"
    )}>
      {/* Contenido de la tarjeta */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex-1">
          <div className="flex items-start gap-8 mb-2">
            <button onClick={() => onToggleFavorite(weather.name)} className="p-2 rounded-xl transition-all mt-1">
              <Heart className={cn("w-8 h-6", favoriteCities.includes(weather.name) && "fill-current text-red-500")} />
            </button>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{weather.name}</h1>
              <p className={cn("text-lg font-medium", isDarkMode ? "text-white/70" : "text-slate-500")}>
                {format(new Date(), 'EEEE, d MMMM', { locale: es })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 flex flex-col items-center justify-center relative z-10">
  {/* Contenedor horizontal para Temperatura e Icono */}
  <div className="flex items-center gap-16">
    {/* Temperatura grande */}
    <span className="text-[6rem] md:text-[6rem] font-bold tracking-tighter leading-none">
      {Math.round(weather.main.temp)}°C
    </span>

    {/* Icono con animación */}
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="flex flex-col items-center">
      <div className="scale-150">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            {/* Descripción debajo del icono */}
            <p className={cn("mt-6 font-medium capitalize text-m whitespace-nowrap", isDarkMode ? "text-white/70" : "text-slate-500")}>
              {weather.weather[0].description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-[20px] uppercase opacity-60 mb-1 font-bold tracking-wider">Sensación</p>
        <p className="text-lg font-bold">{Math.round(weather.main.feels_like)}°</p>
      </div>
      <div>
        <p className="text-[20px] uppercase opacity-60 mb-1 font-bold tracking-wider">Presión</p>
        <p className="text-lg font-bold">{weather.main.pressure} hPa</p>
      </div>
      <div>
        <p className="text-[20px] uppercase opacity-60 mb-1 font-bold tracking-wider">Visibilidad</p>
        <p className="text-lg font-bold">{Math.round(weather.visibility / 1000)} km</p>
      </div>
    </div>

    </div>

  );
}