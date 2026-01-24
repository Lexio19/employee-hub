import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}