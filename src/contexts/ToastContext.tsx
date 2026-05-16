import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (opts: Omit<Toast, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  error: <AlertCircle className="w-5 h-5 text-red-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
};

const BG: Record<ToastType, string> = {
  success: "border-green-500/20 dark:border-green-500/50 bg-white dark:bg-slate-950 shadow-xl",
  error: "border-red-500/20 dark:border-red-500/50 bg-white dark:bg-slate-950 shadow-xl",
  info: "border-blue-500/20 dark:border-blue-500/50 bg-white dark:bg-slate-950 shadow-xl",
  warning: "border-amber-500/20 dark:border-amber-500/50 bg-white dark:bg-slate-950 shadow-xl",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev.slice(-4), { ...opts, id }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const success = useCallback((title: string, message?: string) => toast({ type: "success", title, message }), [toast]);
  const error = useCallback((title: string, message?: string) => toast({ type: "error", title, message }), [toast]);
  const info = useCallback((title: string, message?: string) => toast({ type: "info", title, message }), [toast]);
  const warning = useCallback((title: string, message?: string) => toast({ type: "warning", title, message }), [toast]);

  return (
    <ToastContext.Provider value={{ toasts, toast, success, error, info, warning, dismiss }}>
      {children}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-4 min-w-80 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 p-5 rounded-2xl border animate-slide-in-right backdrop-blur-xl ${BG[t.type]}`}
          >
            <div className="mt-0.5 flex-shrink-0">{ICONS[t.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-slate-950 dark:text-white tracking-tight">{t.title}</p>
              {t.message && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">{t.message}</p>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all flex-shrink-0 active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
