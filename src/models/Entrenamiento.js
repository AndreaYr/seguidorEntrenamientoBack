import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";
import Deportista from "./Deportista.js";

const Entrenamiento = sequelize.define("Entrenamiento", {
    id_entrenamiento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    disciplina: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    distancia: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    frecuenciaCardiaca: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    velocidadPromedio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    caloriasQuemadas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_deportista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Deportista,
            key: "id_deportista"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_entrenador: {
        type: DataTypes.INTEGER,
        allowNull: true,
    references: {
      model: "entrenadores",
      key: "id_entrenador"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
  }
}, {
    tableName: "entrenamientos",
    timestamps: false
});



export default Entrenamiento;
