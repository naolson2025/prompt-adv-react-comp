import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

export const metadata: Metadata = {
  title: 'Advanced Table',
  description: 'Challenging Gemini to make an advanced table',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="nord">
      <body>
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
