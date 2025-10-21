import mongoose, { Schema, Document } from "mongoose";

export interface IVenta extends Document {
  vendedorId: string;
  monto: number;
  fecha: Date;
}

const VentaSchema: Schema = new Schema({
  vendedorId: { type: Schema.Types.ObjectId, ref: "Vendedor", required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model<IVenta>("Venta", VentaSchema);
