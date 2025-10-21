import mongoose, { Schema, Document } from "mongoose";

export interface IVendedor extends Document {
  nombre: string;
  email: string;
}

const VendedorSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IVendedor>("Vendedor", VendedorSchema);
