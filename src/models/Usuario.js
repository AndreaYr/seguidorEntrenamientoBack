import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define("usuario", {

    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasenia:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    primerNombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    segundoNombre:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    primerApellido:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    segundoApellido: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fechaRegistro:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "usuario",
    }, 
},{  
    tableName: "usuarios",
    timestamps: false

});
export default Usuario;


 

