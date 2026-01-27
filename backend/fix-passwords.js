import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from './models/Employee.js';
import connectDB from './config/db.js';

dotenv.config();

const fixPasswords = async () => {
  try {
    await connectDB();

    const employees = await Employee.find();
    
    console.log(`Encontrados ${employees.length} empleados\n`);

    for (const emp of employees) {
      console.log(`📧 ${emp.email}`);
      
      // Resetear contraseña (esto forzará el hash)
      emp.password = '123456';
      await emp.save();
      
      console.log(`✅ Contraseña actualizada\n`);
    }

    console.log('🎉 Todas las contraseñas han sido actualizadas');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixPasswords();