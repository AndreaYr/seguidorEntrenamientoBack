import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import Usuario from "./Usuario.js";
import Entrenador from "./Entrenador.js";

const Deportista = sequelize.define("Deportista",{
    id_deportista: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: "id_usuario"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_entrenador: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Entrenador,
            key: "id_entrenador"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    peso:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    altura:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
},{
    tableName: "deportistas",
    timestamps: false
});


export default Deportista;