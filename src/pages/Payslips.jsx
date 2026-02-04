import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { payslipService } from '../services/api/payslipService';
import { Download, DollarSign, TrendingUp, Calendar } from 'lucide-react';

export default function Payslips() {
  const { user } = useAuth();
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayslips();
  }, []);

  const loadPayslips = async () => {
    try {
      setLoading(true);
      const response = await payslipService.getPayslips();
      if (response.success) {
        setPayslips(response.data);
      }
    } catch (error) {
      console.error('Error loading payslips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (payslip) => {
    alert(`Descargando nómina de ${payslip.month}...`);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando nóminas...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mis Nóminas</h1>
        <p className="text-gray-600 mt-1">Consulta y descarga tus recibos de nómina</p>
      </div>

      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Salario Neto Actual</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {payslips[0]?.netSalary.toLocaleString()}€
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Salario Bruto</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {payslips[0]?.grossSalary.toLocaleString()}€
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deducciones</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {payslips[0]?.deductions.toLocaleString()}€
              </p>
            </div>
            <Calendar className="w-12 h-12 text-red-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Lista de nóminas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Historial de Nóminas</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {payslips.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tienes nóminas disponibles
            </div>
          ) : (
            payslips.map((payslip) => (
              <div key={payslip._id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {payslip.month}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Fecha de pago: {new Date(payslip.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                    <div className="text-left lg:text-right">
                      <p className="text-sm text-gray-600">Bruto</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {payslip.grossSalary.toLocaleString()}€
                      </p>
                    </div>

                    <div className="text-left lg:text-right">
                      <p className="text-sm text-gray-600">Deducciones</p>
                      <p className="text-lg font-semibold text-red-600">
                        -{payslip.deductions.toLocaleString()}€
                      </p>
                    </div>

                    {payslip.bonus > 0 && (
                      <div className="text-left lg:text-right">
                        <p className="text-sm text-gray-600">Bonus</p>
                        <p className="text-lg font-semibold text-green-600">
                          +{payslip.bonus.toLocaleString()}€
                        </p>
                      </div>
                    )}

                    <div className="text-left lg:text-right">
                      <p className="text-sm text-gray-600">Neto</p>
                      <p className="text-xl font-bold text-green-600">
                        {payslip.netSalary.toLocaleString()}€
                      </p>
                    </div>

                    <button
                      onClick={() => handleDownload(payslip)}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}