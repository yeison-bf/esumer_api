import { Schema, Document, model, Types } from 'mongoose';

export interface Calendar extends Document {
  userId: Types.ObjectId;  // Referencia al usuario
  place: string;           // Lugar de la reunión
  date: Date;              // Fecha de la reunión
  time: string;            // Hora de la reunión (en formato HH:mm)
  reason: string;          // Motivo de la reunión
  description?: string;    // Descripción adicional de la reunión
}

export const CalendarSchema = new Schema<Calendar>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Relación con User
  place: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ }, // Validación de formato HH:mm
  reason: { type: String, required: true },
  description: { type: String }
});

export const CalendarModel = model<Calendar>('Calendar', CalendarSchema);
