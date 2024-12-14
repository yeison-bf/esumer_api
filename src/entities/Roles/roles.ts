import { Schema, Document, model, Types } from 'mongoose';

// Definimos la interfaz para Role
export interface Role extends Document {
  name: string;
}

// Definimos el esquema de Role
export const RoleSchema = new Schema<Role>({
  name: { type: String, required: true, unique: true },
});

// Exportamos el modelo de Role
export const RoleModel = model<Role>('Role', RoleSchema);
