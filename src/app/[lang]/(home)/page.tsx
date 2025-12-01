"use client";
import { Users, BookOpen, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { branch, commit } from "@/git-info.json";
import { localizeHref } from "@/lib/locale";
import { useMessages } from "@/lib/hooks/useMessages";
import { useParams } from "next/navigation";

export default function HomePage() {
  const params = useParams();
  const messages = useMessages();
  return (
    <div className="font-grotesk relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4">
      <a
        href={`https://github.com/HytaleModding/site/tree/${branch}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 bottom-4 z-10 flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-slate-100 px-3 py-1.5 font-mono text-xs transition-colors duration-150 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        <div className="flex items-center gap-1.5">
          <ExternalLinkIcon className="size-4" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {branch}
          </span>
        </div>
        <span className="text-slate-400 dark:text-slate-500">@</span>
        <span className="text-slate-600 dark:text-slate-400">{commit}</span>
      </a>

      <div
        className="pointer-events-none absolute top-0 left-0 z-0 hidden h-full w-full bg-[#cd7f32] xl:block"
        style={{
          clipPath: "polygon(0 0, 32% 0, 16% 100%, 0% 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10" />
      <div className="relative mx-auto max-w-3xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <span className="font-azeret text-sm font-medium text-slate-600 dark:text-slate-400">
            {messages.home.community}
          </span>
        </div>
        <h1 className="bg-gradient-to-b from-slate-500 to-slate-900 bg-clip-text p-2 text-6xl font-bold font-medium tracking-wide text-transparent md:text-7xl dark:from-slate-100 dark:to-slate-400">
          {messages.home.title}
        </h1>
        <div className="mx-auto h-1 w-64 rounded-sm bg-orange-300" />
        <p className="mx-auto max-w-2xl p-2 text-lg leading-relaxed font-light text-slate-600 md:text-xl dark:text-slate-400">
          {messages.home.welcome}
          <span className="font-bold"> {messages.home.welcomeDescription}</span>
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <Link
            href={localizeHref("/docs", params.lang?.toString())}
            className={`inline-flex items-center gap-3 rounded-md bg-[#f3e1c9] px-4 py-2 text-base text-[#a15b00] transition-colors duration-150 ease-in-out hover:bg-[#e4c99d] focus:bg-[#e4c99d] focus:outline-none md:text-lg dark:bg-[#422914] dark:text-[#FFC478] dark:hover:bg-[#5b361a] dark:focus:bg-[#5b361a]`}
          >
            <BookOpen className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="text-base md:text-lg">
              {messages.home.documentation}
            </span>
          </Link>

          <a
            href="https://discord.gg/54WX832HBM"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-md bg-[#e8ecfb] px-4 py-2 text-base text-[#254194] transition-colors duration-150 ease-in-out hover:bg-[#d0daf1] focus:bg-[#d0daf1] focus:outline-none md:text-lg dark:bg-[#2B2D4B] dark:text-[#81A0BE] dark:hover:bg-[#3a3d67] dark:focus:bg-[#3a3d67]`}
          >
            {/* Discord Icon */}
            <svg
              width="3em"
              height="3em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path
                d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base md:text-lg">
              {messages.home.discord}
            </span>
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
