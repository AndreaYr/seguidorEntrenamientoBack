import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import Usuario from "./Usuario.js";

const Entrenador = sequelize.define("entrenador", {
    id_entrenador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
    experiencia: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},{

    tableName: "entrenadores",
    timestamps: false
});
export default Entrenador;
