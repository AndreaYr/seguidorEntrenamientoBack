import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Certificacion = sequelize.define("Certificacion", {
    id_certificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    institucion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaObtencion: {
        type: DataTypes.DATEONLY    ,
        allowNull: false,
    },
}, {
    tableName: "certificaciones",
    timestamps: false,
});

export default Certificacion;