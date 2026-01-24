import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Toast({ type = 'info', message, duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: XCircle,
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    }
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-md
        ${config.bg} border rounded-lg shadow-lg p-4
        transform transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0`} />
        <p className={`flex-1 text-sm font-medium ${config.textColor}`}>
          {message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`${config.textColor} hover:opacity-70 transition`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}