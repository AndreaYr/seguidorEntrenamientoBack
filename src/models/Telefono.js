import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Telefono = sequelize.define("telefono", {
    id_telefono: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    
    tableName: "telefonos",
    timestamps: false
});

export default Telefono;