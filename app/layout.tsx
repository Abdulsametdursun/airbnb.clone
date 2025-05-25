import type { Metadata } from 'next';
import './globals.css';
import ProgressBarClient from '@/components/ProgressBarClient';

export const metadata: Metadata = {
  title: 'AirBNB',
  description: 'Clone Airbnb application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <ProgressBarClient />
        {children}
      </body>
    </html>
  );
}
