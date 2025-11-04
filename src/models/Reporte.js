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
    fechaGeneracion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    periodoEvaluado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    metricasRendimiento: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
}, {
    tableName: "reportes",
    timestamps: false,
});

export default Reporte;