import { Request, Response } from "express";
import Vendedor, { IVendedor } from "../models/vendedorModel";

export const getVendedores = async (req: Request, res: Response) => {
  const vendedores: IVendedor[] = await Vendedor.find();
  res.json(vendedores);
};

export const createVendedor = async (req: Request, res: Response) => {
  const nuevoVendedor = new Vendedor(req.body);
  await nuevoVendedor.save();
  res.status(201).json(nuevoVendedor);
};
