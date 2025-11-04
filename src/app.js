import express from "express";
import { connectSequelize } from "./database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./models/Index.js"; // Importar todos los modelos
import Usuario from "./routes/UsuarioRoutes.js";
import DeportistaRoutes from "./routes/DeportistaRoutes.js";
import EntrenamientoRoutes from "./routes/EntrenamientoRoutes.js";
import ReporteRoutes from "./routes/ReporteRoutes.js";
import RetoRoutes from "./routes/RetoRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const app = express();
let server;


// Middlewares
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: "*",
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


// Rutas públicas 
app.use("/usuarios", Usuario);
app.use("/deportistas", DeportistaRoutes);
app.use("/entrenamientos", EntrenamientoRoutes);
app.use("/reportes", ReporteRoutes);
app.use("/reto", RetoRoutes);


const startServer = async () => {
  try {
    await connectSequelize(); // Conectar a la base de datos
    console.log("Conectado a Postgres con Sequelize");
    
    // Crear el servidor HTTP
    server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

    // Manejar el cierre gracioso del servidor
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    // Mantener el proceso vivo
    process.stdin.resume();
  } catch (error) {
    console.error("Error iniciando la aplicación:", error);
    process.exit(1);
  }
}

// Función para cerrar el servidor de manera graciosa
function gracefulShutdown(signal) {
  console.log(`Recibida señal ${signal}. Iniciando cierre gracioso...`);
  if (server) {
    server.close(() => {
      console.log("Servidor HTTP cerrado.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

// Manejo de errores no capturados
process.on("uncaughtException", (error) => {
  console.error("Error no capturado:", error);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (error) => {
  console.error("Promesa rechazada no manejada:", error);
  gracefulShutdown("unhandledRejection");
});

startServer();

