import { Clock, Wind, Droplets } from 'lucide-react'; 
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export default function ForecastList({ weather, forecast, isDarkMode }: any) {
  // Verificación de seguridad: si no hay datos, no renderizamos nada o mostramos un aviso
  if (!weather || !forecast || !forecast.list) {
    return <div className="text-center p-4 opacity-50">No hay pronóstico disponible.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className={cn("backdrop-blur-md border rounded-3xl p-6 flex flex-col items-center gap-2", isDarkMode ? "bg-white/10 border-white/20" : "bg-white/40 border-black/5")}>
          <Wind className="w-6 h-6 text-blue-400" />
          <span className={cn("text-sm uppercase tracking-wider font-bold", isDarkMode ? "text-white/50" : "text-slate-400")}>Viento</span>
          <span className="text-xl font-bold">{weather.wind.speed} km/h</span>
        </div>
        <div className={cn("backdrop-blur-md border rounded-3xl p-6 flex flex-col items-center gap-2", isDarkMode ? "bg-white/10 border-white/20" : "bg-white/40 border-black/5")}>
          <Droplets className="w-6 h-6 text-cyan-500" />
          <span className={cn("text-sm uppercase tracking-wider font-bold", isDarkMode ? "text-white/50" : "text-slate-400")}>Humedad</span>
          <span className="text-xl font-bold">{weather.main.humidity}%</span>
        </div>
      </div>

      <div className={cn("backdrop-blur-md border rounded-[2rem] p-6 flex-1", isDarkMode ? "bg-white/10 border-white/20" : "bg-white/40 border-black/5")}>
        <div className="flex items-center gap-2 mb-6 px-2">
          <Clock className={cn("w-5 h-5", isDarkMode ? "text-white/50" : "text-slate-400")} />
          <h3 className={cn("font-bold uppercase tracking-widest text-xs", isDarkMode ? "text-white/50" : "text-slate-400")}>Próximas horas</h3>
        </div>
        <div className="space-y-4">
          {forecast.list.slice(0, 5).map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl">
              <span className="text-sm font-medium">{format(new Date(item.dt * 1000), 'HH:mm')}</span>
              <div className="flex items-center gap-3">
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} className="w-8 h-8" />
                <span className="font-bold text-lg">{Math.round(item.main.temp)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}