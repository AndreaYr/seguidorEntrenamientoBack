import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

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
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "usuario",
    }, 
},{  
    tableName: "usuarios",
    timestamps: false,

    hooks: {
      // Encripta al crear un usuario individual
      beforeCreate: async (usuario) => {
        if (usuario.contrasenia) {
          const salt = await bcrypt.genSalt(10);
          usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);
        }
      },
      // Encripta cuando se usa bulkCreate
      beforeBulkCreate: async (usuarios) => {
        for (const usuario of usuarios) {
          if (usuario.contrasenia) {
            const salt = await bcrypt.genSalt(10);
            usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);
          }
        }
      },
    }

});
export default Usuario;


 

