import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    alias:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    contrasenia:{
        type: DataTypes.STRING,
        allowNull: false
    },
},)