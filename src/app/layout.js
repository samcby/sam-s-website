import "./globals.css";
import "react-resizable/css/styles.css";
import { Inter } from "next/font/google";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ri Yang's Portfolio",
  description: "Welcome to my portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen transition-all duration-300
                       dark:bg-[#121212] dark:text-white
                       bg-[#fdf6e3] text-[#002b36]`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow transition-colors duration-300 
                           dark:bg-[#121212] bg-[#fdf6e3]">
              {children}
            </main>
            <Footer />
            <div className="fixed bottom-5 right-5 z-50">
              <ThemeToggle />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
