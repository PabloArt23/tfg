import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Obra = sequelize.define('obra', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
    },
    anio:{
        type: DataTypes.INTEGER
    },
    precio:{
        type: DataTypes.FLOAT
    },
    categoria:{
        type: DataTypes.STRING
    },
    tecnica:{
        type: DataTypes.STRING
    },
    imagen:{
        type: DataTypes.STRING
    },
    alt:{
        type: DataTypes.STRING
    },
    disposicion:{
        type: DataTypes.STRING
    },
    reciente:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: true,
    }

},)