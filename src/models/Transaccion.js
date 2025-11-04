import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import Usuario from "./Usuario.js";
import PlanSuscripcion from "./PlanSuscripcion.js";

const Transaccion = sequelize.define("Transaccion", {
    id_transaccion:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    metodoPago:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    monto:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendiente",
    },
    fechaTransaccion:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: "id_usuario"
        },
        onDelete: "CASCADE"
    },
    id_plan:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlanSuscripcion,
            key: "id_plan"
        },
        onDelete: "CASCADE"
    }
},{
    tableName: "transacciones",
    timestamps: false
});
export default Transaccion;