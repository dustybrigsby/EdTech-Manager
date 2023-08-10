const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Staff extends Model {}

Staff.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // equipment_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         //'id' from Equip model
        //         model: 'equipment',
        //         key: 'id'
        //     }
        // },
        // school_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         //'id' from School model
        //         model: 'school',
        //         key: 'id'
        //     }
        // },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                //'id' from User
                model: 'user',
                key: 'id'
            }
        }
    }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
    }
);

module.exports = Comment;