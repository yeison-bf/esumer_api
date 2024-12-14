// Importamos las dependencias necesarias
import { Schema, Document, model, Types } from 'mongoose';

// Definimos la interfaz para Repository
export interface Repository extends Document {
    name: string;
    url: string;
    description?: string; 
    project: Types.ObjectId; // Referencia al proyecto asociado
}

// Definimos el esquema de Repository
export const RepositorySchema = new Schema<Repository>({
    name: { type: String, maxlength: 450, required: true },
    url: { type: String, maxlength: 4500, required: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Exportamos el modelo de Repository
export const RepositoryModel = model<Repository>('Repository', RepositorySchema);