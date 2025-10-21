import { Request, Response } from "express";
import Venta, { IVenta } from "../models/ventaModel";

export const getVentas = async (req: Request, res: Response) => {
  const ventas: IVenta[] = await Venta.find();
  res.json(ventas);
};

export const createVenta = async (req: Request, res: Response) => {
  const nuevaVenta = new Venta(req.body);
  await nuevaVenta.save();
  res.status(201).json(nuevaVenta);
};
