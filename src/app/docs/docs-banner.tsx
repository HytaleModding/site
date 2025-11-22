'use client';

import { useEffect, useState } from 'react';

export function DocsBanner() {
  const [gitInfo, setGitInfo] = useState({ branch: 'main', commit: 'abc1234' });

  useEffect(() => {
    fetch('/git-info.json')
      .then(res => res.json())
      .then(data => setGitInfo(data))
      .catch(() => console.log('Git info not available'));
  }, []);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-screen-2xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Documentation In Progress</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.5 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h2.293L8.146 1.354a.5.5 0 0 1 .708-.708L11 2.793V.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M5 2.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 11.5 14h-9A1.5 1.5 0 0 1 1 12.5v-9A1.5 1.5 0 0 1 2.5 2h2a.5.5 0 0 1 .5.5z"/>
            </svg>
            <span>{gitInfo.branch}</span>
            <span className="text-slate-400 dark:text-slate-600">@</span>
            <span>{gitInfo.commit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}