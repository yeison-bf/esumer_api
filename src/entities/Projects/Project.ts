import { Schema, Document, model, Types } from 'mongoose';

// Definimos la interfaz para Project
export interface Project extends Document {
  company_name: string;
  name: string;
  description: string;
  descriptionShort: string;
  banner: string;
  logo: string;
  program: string;
  repositories: Types.ObjectId[]; // Lista de referencias a repositorios
  urlHosting: string;
  userRegister: string;
  groups: any[]; // Ahora es un array de objetos JSON, no referencias
  asesor: any[]; // Ahora es un array de objetos JSON, no referencias
  teacher: any[]; // Ahora es un array de objetos JSON, no referencias
}

// Definimos el esquema de Project
export const ProjectSchema = new Schema<Project>({
  company_name: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  descriptionShort: { type: String, required: true },
  banner: { type: String },
  logo: { type: String },
  program: { type: String, required: true },
  repositories: [{ type: Schema.Types.ObjectId, ref: 'Repository' }], // Relación con repositorios
  urlHosting: { type: String },
  userRegister: { type: String },
  groups: [{ type: Schema.Types.Mixed }], // Ahora 'groups' almacena un objeto JSON directamente
  asesor: [{ type: Schema.Types.Mixed }], // Ahora 'groups' almacena un objeto JSON directamente
  teacher: [{ type: Schema.Types.Mixed }], // Ahora 'groups' almacena un objeto JSON directamente
});

// Exportamos el modelo de Project
export const ProjectModel = model<Project>('Project', ProjectSchema);
