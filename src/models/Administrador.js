import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Administrador = sequelize.define("Administrador", {
    id_administrador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id_usuario"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permisosAsignados:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "administradores",
    timestamps: false,
})

export default Administrador;