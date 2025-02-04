import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'JobTracker',
  description: 'Job Application Tracker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            {/* Content with margin to prevent overlap */}
            <main className="ml-64 flex-1">
              <div className="container mx-auto max-w-7xl px-4 py-8">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
