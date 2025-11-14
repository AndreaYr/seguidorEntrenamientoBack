import { sequelize } from "../database.js";

// Importar modelos en orden de dependencias
// 1. Primero los modelos base sin dependencias
import Usuario from "./Usuario.js";

// 2. Modelos que dependen de Usuario
import Entrenador from "./Entrenador.js";
import Deportista from "./Deportista.js";
import Administrador from "./Administrador.js";
import Telefono from "./Telefono.js";

// 3. Modelos independientes
import Ejercicio from "./Ejercicio.js";
import Reto from "./Reto.js";

// 4. Modelos que dependen de las tablas anteriores
import Entrenamiento from "./Entrenamiento.js";
import ObjetivoDeportivo from "./ObjetivoDeportivo.js";
import DeportistaReto from "./DeportistaReto.js";
import Reporte from "./Reporte.js";
import Transaccion from "./Transaccion.js";
import PlanSuscripcion from "./PlanSuscripcion.js";
import EntrenamientoEjercicio from "./EntrenamientoEjercicio.js";

// Asegurar que todas las tablas se creen en el orden correcto
// En desarrollo, usar alter: true para mantener los datos
await sequelize.sync({ alter: true, logging: console.log });

// Exportar los modelos
export const models = sequelize.models;

// Definir relaciones entre modelos aquí si es necesario
Deportista.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });
Usuario.hasOne(Deportista, { foreignKey: "id_usuario" });

Entrenador.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasOne(Entrenador, { foreignKey: "id_usuario" });

Administrador.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasOne(Administrador, { foreignKey: "id_usuario" });

Telefono.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Telefono, { foreignKey: "id_usuario" });

Deportista.hasMany(Entrenamiento, { foreignKey: "id_deportista" });
Entrenamiento.belongsTo(Deportista, { foreignKey: "id_deportista" });

Entrenador.hasMany(Entrenamiento, { foreignKey: "id_entrenador" });

// Relaciones para Retos
Reto.hasMany(DeportistaReto, { foreignKey: "id_reto" });
DeportistaReto.belongsTo(Reto, { foreignKey: "id_reto" });

Deportista.hasMany(DeportistaReto, { foreignKey: "id_deportista" });
DeportistaReto.belongsTo(Deportista, { foreignKey: "id_deportista" });
Entrenamiento.belongsTo(Entrenador, { foreignKey: "id_entrenador" });

Entrenamiento.belongsToMany(Ejercicio, { through: EntrenamientoEjercicio, foreignKey: "id_entrenamiento" });
Ejercicio.belongsToMany(Entrenamiento, { through: EntrenamientoEjercicio, foreignKey: "id_ejercicio" });

Deportista.belongsToMany(Reto, { through: "DeportistaReto", foreignKey: "id_deportista" });
Reto.belongsToMany(Deportista, { through: "DeportistaReto", foreignKey: "id_reto" });

// Relación entre Deportista y Reporte
Deportista.hasMany(Reporte, { foreignKey: "id_deportista" });
Reporte.belongsTo(Deportista, { foreignKey: "id_deportista" });

Entrenador.hasMany(Deportista, { foreignKey: "id_entrenador", onDelete: "SET NULL" });
Deportista.belongsTo(Entrenador, { foreignKey: "id_entrenador" });

PlanSuscripcion.hasMany(Transaccion, { foreignKey: "id_plan" });
Transaccion.belongsTo(PlanSuscripcion, { foreignKey: "id_plan" });

Usuario.hasMany(Transaccion, { foreignKey: "id_usuario" });
Transaccion.belongsTo(Usuario, { foreignKey: "id_usuario" });

Deportista.hasMany(ObjetivoDeportivo, { foreignKey: "id_deportista", as: "objetivos"});
ObjetivoDeportivo.belongsTo(Deportista, { foreignKey: "id_deportista", as: "deportista" });