'use client';

import { useEffect, useState } from 'react';
import { branch, commit } from '@/git-info.json';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

export function DocsBanner() {
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
          <Link href={`https://github.com/HytaleModding/site/tree/${branch}`} className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
            <ExternalLinkIcon className="size-4"/>
            <span>{branch}</span>
            <span className="text-slate-400 dark:text-slate-600">@</span>
            <span>{commit}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}