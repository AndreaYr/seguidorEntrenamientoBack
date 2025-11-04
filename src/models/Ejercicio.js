import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Ejercicio = sequelize.define("Ejercicio", {
    id_ejercicio:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,  
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: true,  
    },
    metricas:{
        type: DataTypes.STRING,
        allowNull: true,  
    },
    intensidad:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    tableName: "ejercicios",
    timestamps: false
});

export default Ejercicio;