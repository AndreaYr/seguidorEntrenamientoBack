import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const EntrenamientoEjercicio = sequelize.define("EntrenamientoEjercicio", {
    id: {
        type: DataTypes.INTEGER,   
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_entrenamiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_ejercicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "entrenamientos_ejercicios",
    timestamps: false,
});

export default EntrenamientoEjercicio;