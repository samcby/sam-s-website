import "./globals.css";
import "react-resizable/css/styles.css"; //drag and drop feature
import { Inter } from "next/font/google";
import Navbar from "@components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "@components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <title>Rick Yang | Portfolio </title>
        <Navbar />
        <main className="bg-[#121212] min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
