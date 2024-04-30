import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AUTOLAND",
  description: "Import samochodów z UE, USA i Japoni",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={inter.className}>
    <body>
        <Providers>
            <main className="dark">
                {children}
            </main>
        </Providers>
    </body>
    </html>
  );
}
