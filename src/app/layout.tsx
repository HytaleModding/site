import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Hanken_Grotesk } from 'next/font/google';

// looks much worse imo
const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
})
// its still not loading the font

// now it is properly loaded lol

// colors fucked up a bit. looking into that

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={hankenGrotesk.style} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
