import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const DeportistaReto = sequelize.define("DeportistaReto", {
    id_deportista: {
        type: DataTypes.INTEGER,
        references: {
        model: "deportistas",
        key: "id_deportista",
        },
        onDelete: "CASCADE",
    },
    id_reto: {
        type: DataTypes.INTEGER,
        references: {
        model: "retos",
        key: "id_reto",
        },
        onDelete: "CASCADE",
    },
    fecha_inscripcion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    tableName: "deportista_reto",
    timestamps: false,
});

export default DeportistaReto;