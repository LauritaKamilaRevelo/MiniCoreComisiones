import { Request, Response } from "express";
import Regla, { IRegla } from "../models/reglaModel";

export const getReglas = async (req: Request, res: Response) => {
  const reglas: IRegla[] = await Regla.find();
  res.json(reglas);
};

export const createRegla = async (req: Request, res: Response) => {
  const nuevaRegla = new Regla(req.body);
  await nuevaRegla.save();
  res.status(201).json(nuevaRegla);
};
