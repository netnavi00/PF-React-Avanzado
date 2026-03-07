import { AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function ErrorMessage({ error, onRetry, isDarkMode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "backdrop-blur-md border p-8 rounded-[2.5rem] flex flex-col items-center gap-6 max-w-md text-center",
        isDarkMode ? "bg-white/10 border-white/20" : "bg-white/40 border-black/10 shadow-xl"
      )}
    >
      {error === 'MISSING_KEY' ? (
        <>
          <div className="p-4 bg-yellow-500/20 rounded-full">
            <AlertCircle className="w-12 h-12 text-yellow-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Configuración Requerida</h2>
            <p className={isDarkMode ? "text-white/70" : "text-slate-600"}>
              Para ver el clima real, necesitas una clave de API de OpenWeatherMap.
            </p>
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="w-12 h-12 text-red-400" />
          <p className="font-medium">{error}</p>
        </>
      )}
      
      <button 
        onClick={onRetry}
        className={cn(
          "w-full py-3 font-bold rounded-2xl transition-colors",
          isDarkMode ? "bg-white text-slate-900 hover:bg-white/90" : "bg-slate-900 text-white hover:bg-slate-800"
        )}
      >
        Reintentar
      </button>
    </motion.div>
  );
}