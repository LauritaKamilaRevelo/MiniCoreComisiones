import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import vendedorRoutes from "./routes/vendedor.routes";
import ventaRoutes from "./routes/venta.routes";
import reglaRoutes from "./routes/regla.routes";
import comisionRoutes from "./routes/comision.routes";


dotenv.config();

class Server {
  private app: Application;

  constructor() {
  this.app = express();
  this.app.use(cors());
  this.app.use(express.json());
  this.connectDB();
  this.setupRoutes();
}

  // Conexión a MongoDB
  private async connectDB(): Promise<void> {
    try {
      const mongoUri = process.env.MONGO_URI || "";
      if (!mongoUri) {
        throw new Error("MONGO_URI no está definido en el archivo .env");
      }
      await mongoose.connect(mongoUri);
      console.log("✅ Conectado a MongoDB");
    } catch (error: any) {
      console.error("❌ Error al conectar a MongoDB:", error.message || error);
      process.exit(1);
    }
  }

  // Rutas
  private setupRoutes(): void {
    // Health check
    this.app.get("/health", (req: Request, res: Response) => {
      res.json({
        success: true,
        message: "Backend de MinicoreComisiones funcionando correctamente",
        timestamp: new Date().toISOString(),
      });
    });

    // Rutas principales
    this.app.use("/api/vendedores", vendedorRoutes);
    this.app.use("/api/ventas", ventaRoutes);
    this.app.use("/api/reglas", reglaRoutes);
    this.app.use("/api/comisiones", comisionRoutes);

    // 404
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: "Ruta no encontrada",
        path: req.path,
      });
    });
  }

  // Iniciar servidor
  public start(): void {
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log("===========================================");
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log("===========================================");
    });
  }
}

// Crear e iniciar server
const server = new Server();
server.start();
