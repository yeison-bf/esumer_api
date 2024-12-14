import { Schema, Document, model, Types } from 'mongoose';

// Definimos la interfaz para Group
export interface Group extends Document {
  name: string;
  email?: string;
  phone?: string;
  profession?: string;
  program: string;
  project: Types.ObjectId; // Relación con el proyecto
}

export const GroupSchema = new Schema<Group>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  profession: { type: String },
  program: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project' }, // Relación con el proyecto
});

export const GroupModel = model<Group>('Group', GroupSchema);
