import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 ${
          isSuccess
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/50'
            : 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-950/50'
        }`}
      >
        <div className="flex items-center gap-3">
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
