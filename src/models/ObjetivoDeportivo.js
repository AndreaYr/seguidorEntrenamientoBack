import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const ObjetivoDeportivo = sequelize.define("ObjetivoDeportivo", {
    id_objetivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }, 
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "objetivos_deportivos",
    timestamps: false,
});

export default ObjetivoDeportivo;