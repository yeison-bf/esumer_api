import { Schema, Document, model, Types } from 'mongoose';
// Definimos la interfaz para Address
interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Definimos la interfaz para Customer
export interface Customer extends Document {
  userId: Types.ObjectId; // Relación con el usuario
  rating: number;
  score: number;
  customerType: 'premium' | 'basic';
  deliveryAddresses: Address[]; // Lista de direcciones de entrega
}

// Esquema de Customer
const CustomerSchema = new Schema<Customer>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  customerType: { type: String, required: true, enum: ['premium', 'basic'] },
  deliveryAddresses: [
    {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
});

// Exportamos el modelo de Customer
export const CustomerModel = model<Customer>('Customer', CustomerSchema);
