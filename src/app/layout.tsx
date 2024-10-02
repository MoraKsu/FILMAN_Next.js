import type { Metadata } from "next";
import './globals.css';
import NoiseBackground from '../components/UI/NoiseBackground';

export const metadata: Metadata = {
  title: "FILMAN",
  description: "Трекер отслеживания кинопросмотров",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <NoiseBackground />
        {children}
      </body>
    </html>
  );
}
