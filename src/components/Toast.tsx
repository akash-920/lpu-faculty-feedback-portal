import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white border border-slate-200/90 shadow-lg rounded-xl p-3.5 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2.5">
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-blue-600 shrink-0" />
        )}
        <span className="text-xs sm:text-sm font-medium text-slate-800 leading-tight">
          {message}
        </span>
      </div>

      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

