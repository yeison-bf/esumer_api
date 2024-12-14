import { Schema, Document, model, Types } from 'mongoose';

// Definimos la interfaz para Documents
export interface Documents extends Document {
  name: string;
  url?: string;
  tipo?: string;
  project: Types.ObjectId; // Referencia al proyecto asociado
}

// Definimos el esquema de Documents
export const DocumentsSchema = new Schema<Documents>({
  name: { type: String, required: true },
  url: { type: String },
  tipo: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Exportamos el modelo de Documents
export const DocumentsModel = model<Documents>('Documents', DocumentsSchema);

