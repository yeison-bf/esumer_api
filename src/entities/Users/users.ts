import { Schema, Document, model, Types } from 'mongoose';

// Definimos la interfaz para User
export interface User extends Document {
  document: string; // Número de documento
  name: string;
  lastname: string;
  email: string;
  password: string; // Contraseña del usuario
  role: string; // Relación con el rol del usuario
  program: string; // Relación con el rol del usuario
  createdAt: Date;
  updatedAt: Date;
}

// Definimos el esquema de User
export const UserSchema = new Schema<User>({
  document: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  program: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Exportamos el modelo de User
export const UserModel = model<User>('User', UserSchema);
