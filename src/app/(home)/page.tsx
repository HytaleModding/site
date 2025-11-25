import { Users, BookOpen, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { branch, commit } from '@/git-info.json';

export default function HomePage() {
  return (
    <div className="font-grotesk flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] px-4 relative overflow-hidden">
      {/* Branch and Commit Info - Bottom Right */}
      <a 
        href={`https://github.com/HytaleModding/site/tree/${branch}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-mono hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer"
      >
        <div className="flex items-center gap-1.5">
          <ExternalLinkIcon className="size-4"/>
          <span className="text-slate-700 dark:text-slate-300 font-medium">{branch}</span>
        </div>
        <span className="text-slate-400 dark:text-slate-500">@</span>
        <span className="text-slate-600 dark:text-slate-400">{commit}</span>
      </a>

      <div 
        className="absolute top-0 left-0 h-full w-full bg-[#cd7f32] z-0 pointer-events-none hidden xl:block"
        style={{ 
          clipPath: 'polygon(0 0, 32% 0, 16% 100%, 0% 100%)' 
        }}
      />
      <div className="absolute inset-0 -z-10" />
      <div className="max-w-3xl mx-auto text-center space-y-6 relative">
        <div className="inline-flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="font-azeret text-sm font-medium text-slate-600 dark:text-slate-400">
            Community
          </span>
        </div>
        <h1 className="text-6xl font-medium p-2 md:text-7xl font-bold tracking-wide bg-gradient-to-b from-slate-500 to-slate-900 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
          Hytale Modding
        </h1>
        <div className="w-64 h-1 bg-orange-300 mx-auto rounded-sm" />
          <p className="text-lg p-2 md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Welcome to Hytale Modding!
            <span className='font-bold'> This is an unofficial community for modding Hytale</span>, providing guides, documentation, and resources.
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              href="/docs"
              className={`
                inline-flex items-center gap-3 px-4 py-2 text-base md:text-lg rounded-md
                bg-[#f3e1c9] text-[#a15b00]
                dark:bg-[#422914] dark:text-[#FFC478]
                transition-colors duration-150 ease-in-out
                hover:bg-[#e4c99d] dark:hover:bg-[#5b361a]
                focus:bg-[#e4c99d] dark:focus:bg-[#5b361a]
                focus:outline-none
              `}
            >
              <BookOpen className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              <span className="text-base md:text-lg">Documentation</span>
            </Link>

            <a
              href="https://discord.gg/54WX832HBM"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-2 px-4 py-2 text-base md:text-lg rounded-md
                bg-[#e8ecfb] text-[#254194]
                dark:bg-[#2B2D4B] dark:text-[#81A0BE]
                transition-colors duration-150 ease-in-out
                hover:bg-[#d0daf1] dark:hover:bg-[#3a3d67]
                focus:bg-[#d0daf1] dark:focus:bg-[#3a3d67]
                focus:outline-none
              `}
            >
              {/* Discord Icon */}
              <svg
                width="3em"
                height="3em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                <path
                  d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base md:text-lg">Discord</span>
            </a>
          </div>
      </div>
      
      {/* Copyright Footer */}
      <div className="absolute bottom-4 left-4 z-10 text-xs text-slate-900 dark:text-slate-900">
        © {new Date().getFullYear()} Hytale Modding
      </div>
    </div>
  );
}