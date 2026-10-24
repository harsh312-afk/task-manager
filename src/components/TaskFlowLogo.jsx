import React from 'react';

export default function TaskFlowLogo({ className = 'h-8 w-8', withText = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-sm select-none"
        >
          <defs>
            <linearGradient id="tfGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="45%" stopColor="#6366f1" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="cardGradLogo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="checkGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" rx="120" fill="url(#tfGradLogo)" />
          <rect x="6" y="6" width="500" height="500" rx="114" stroke="white" strokeOpacity="0.25" strokeWidth="6" fill="none" />
          
          {/* Column 1 */}
          <rect x="84" y="104" width="156" height="116" rx="22" fill="url(#cardGradLogo)" />
          <rect x="108" y="128" width="52" height="14" rx="7" fill="#6366f1" />
          <rect x="108" y="154" width="108" height="12" rx="6" fill="#1e293b" />
          <circle cx="216" cy="135" r="7" fill="#38bdf8" />

          <rect x="84" y="244" width="156" height="164" rx="22" fill="url(#cardGradLogo)" />
          <rect x="108" y="268" width="62" height="14" rx="7" fill="#f59e0b" />
          <rect x="108" y="294" width="108" height="12" rx="6" fill="#1e293b" />
          <rect x="108" y="372" width="108" height="10" rx="5" fill="#e2e8f0" />
          <rect x="108" y="372" width="72" height="10" rx="5" fill="#f59e0b" />

          {/* Column 2 with Checkmark */}
          <rect x="272" y="104" width="156" height="304" rx="22" fill="url(#cardGradLogo)" />
          <rect x="296" y="128" width="54" height="14" rx="7" fill="#10b981" />
          <rect x="296" y="154" width="108" height="12" rx="6" fill="#1e293b" />
          
          <circle cx="350" cy="254" r="44" fill="url(#checkGradLogo)" />
          <path d="M332 254 L344 267 L368 239" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-300">
            TaskFlow
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500">
            Kanban Studio
          </span>
        </div>
      )}
    </div>
  );
}
