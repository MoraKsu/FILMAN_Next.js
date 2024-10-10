import type { Metadata } from "next";
import './globals.css';
import NoiseBackground from '../components/UI/NoiseBackground';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

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
      <head>
        {/* Фавиконки */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Метатеги */}
        <meta name="description" content="FILMAN - Трекер отслеживания кинопросмотров" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FILMAN</title>
      </head>
      <body>
        <Provider store={store}>
          <NoiseBackground />
          {children}
        </Provider>
      </body>
    </html>
  );
}
