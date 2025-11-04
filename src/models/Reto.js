import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Reto = sequelize.define("Reto", {
    id_reto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duracionDias: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "activo",
    }
}, {
    tableName: "retos",
    timestamps: false,
});

export default Reto;