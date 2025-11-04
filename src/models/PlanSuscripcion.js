import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const PlanSuscripcion = sequelize.define("PlanSuscripcion", {
    id_plan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caracteristicas: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duracionMeses: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "planes_suscripcion",
    timestamps: false,
});

export default PlanSuscripcion;