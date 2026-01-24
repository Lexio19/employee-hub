import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
          <p className="flex items-center space-x-1">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>por Alejandro Miras</span>
          </p>
          <p className="mt-2 sm:mt-0">
            © 2026 EmployeeHub. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}