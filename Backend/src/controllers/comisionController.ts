import { Request, Response } from "express";
import Venta from "../models/ventaModel";
import Regla from "../models/reglaModel";
import Vendedor from "../models/vendedorModel";

export const calcularComisiones = async (req: Request, res: Response) => {
  try {
    const { desde, hasta } = req.query;

    if (!desde || !hasta) {
      return res.status(400).json({ error: "Debe proporcionar 'desde' y 'hasta' en formato YYYY-MM-DD" });
    }

    const fechaInicio = new Date(desde as string);
    const fechaFin = new Date(hasta as string);

    // Filtrar ventas dentro del rango
    const ventas = await Venta.find({
      fecha: { $gte: fechaInicio, $lte: fechaFin },
    }).populate("vendedorId");

    // Obtener regla activa (por ahora asumimos solo una)
    const regla = await Regla.findOne();
    if (!regla) {
      return res.status(400).json({ error: "No hay reglas definidas" });
    }

    // Calcular comisiones por vendedor
    const comisiones: Record<string, number> = {};
    ventas.forEach((venta) => {
      const vendedor = (venta as any).vendedorId;
      const nombre = vendedor.nombre;
      const comision = (venta.monto * regla.porcentaje) / 100;
      comisiones[nombre] = (comisiones[nombre] || 0) + comision;
    });

    res.json({
      desde,
      hasta,
      porcentajeRegla: regla.porcentaje,
      comisiones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al calcular comisiones" });
  }
};
