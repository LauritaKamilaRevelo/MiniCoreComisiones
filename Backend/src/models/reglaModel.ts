import mongoose, { Schema, Document } from "mongoose";

export interface IRegla extends Document {
  descripcion: string;
  porcentaje: number;
}

const ReglaSchema: Schema = new Schema({
  descripcion: { type: String, required: true },
  porcentaje: { type: Number, required: true },
});

export default mongoose.model<IRegla>("Regla", ReglaSchema);
