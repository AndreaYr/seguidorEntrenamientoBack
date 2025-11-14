import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Reporte = sequelize.define("Reporte", {
    id_reporte: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    id_deportista:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'deportistas',
            key: 'id_deportista'
        }
    },
    fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    caloriasTotales: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    distanciaTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    velocidadPromedio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    entrenamientosRealizados: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    tableName: "reportes",
    timestamps: false,
});

export default Reporte;