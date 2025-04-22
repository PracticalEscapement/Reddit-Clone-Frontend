import '../styles/global.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Reddit Clone',
  description: 'A Reddit-style app built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
