import { DataTypes } from "sequelize";
import { sequelize } from "../database.js"; // ← Asegúrate de que esta importación sea correcta

const DeportistaReto = sequelize.define("DeportistaReto", {
    id_deportista_reto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    posicion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    progreso: {
        type: DataTypes.STRING,
        allowNull: true
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